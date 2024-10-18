import React, { useEffect, useState } from 'react';
import TodoItem from './ToDoItem';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [placeholder, setPlaceholder] = useState(null);
    const [text, setText] = useState('');
    const [errorText, setErrorText] = useState('');
    const [handleError, sethandleError] = useState(false);

    const addTask = (text) => {
        if (!text) {
            sethandleError(true);
            setErrorText("Please add an item");
            return;
        };

        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };

        setTasks([...tasks, newTask]);
        setText('');
        setErrorText('');
        sethandleError(false);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleCompleted = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            } else {
                return task;
            }
        }));
    };

    //localStorage getItem
    useEffect(()  => {
        const storedValue = JSON.parse(localStorage.getItem('tasks'));

        if (Array.isArray(storedValue) && storedValue.length > 0) {
            setTasks(storedValue);
        };
    }, []);

    //localStorage setItem && randomPlaceholder logic
    useEffect(() => {
        const randomPlaceholder = () => {
            const items = ["Walk the dog...", "Do homework...", "Make dinner...", "Have a beer...", "Change my socks..."];

            const randomIndex = Math.floor(Math.random() * items.length);
            setPlaceholder(items[randomIndex]);
        };

        randomPlaceholder();

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="todo-list">
            <div className='title'>tudooist</div>
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                />
            ))}
            <input
                value={text}
                onChange={event => setText(event.target.value)}
                className='input-field'
                placeholder={placeholder}
                onKeyDown={(event) => {
                    if (event.key === "Enter")
                        addTask(text);
                    }
                }
            />
            <button className='add-task' onClick={() => addTask(text)}>Add</button>

            {handleError ?
                <div className='error'>
                    <p>{errorText}</p>
                </div>
                :
                <></>
            }
        </div>
    );
}

export default TodoList;