import React from 'react';

const TodoItem = ({ task, deleteTask, toggleCompleted }) => {
    const handleChange = () => {
        toggleCompleted(task.id);
    }

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleChange}
                className= {task.completed ? "completed" : ""}
            />
            <p>{task.text}</p>
            <button className='delete' onClick={() => deleteTask(task.id)}>
                x
            </button>
        </div>
    );
}

export default TodoItem;