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
                return {...task, completed: !task.completed };
            } else {
                return task;
            }
        }));
    };

    useEffect(() => {
        const randomPlaceholder = () => {
            const items = ["Walk the dog...", "Do homework...", "Make dinner...", "Have a beer...", "Change my socks..."];
    
            const randomIndex = Math.floor(Math.random() * items.length);
            setPlaceholder(items[randomIndex]);
        };

        randomPlaceholder();
    }, []);

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
                onChange={e => setText(e.target.value)}
                className='input-field'
                placeholder={placeholder}
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