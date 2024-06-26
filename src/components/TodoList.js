import React, { useState } from 'react';
import TodoItem from './ToDoItem';

function TodoList() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctor Appointment',
            completed: true
        },
        {
            id: 2,
            text: 'Meeting at School',
            completed: false
        }
    ]);

    const [text, setText] = useState('');

    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setText('');
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const toggleCompleted = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed };
            } else {
                return task;
            }
        }));
    }

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
            />
            <button className='add-task' onClick={() => addTask(text)}>Add</button>
        </div>
    );
}

export default TodoList;