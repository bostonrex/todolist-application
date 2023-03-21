import React, { useState } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setTasks([...tasks, { text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const pendingTasks = tasks.filter((task) => !task.completed).length;

    return (
        <div className='d-flex justify-content-center mt-5'>
            <div className='TodoListCard border col-6'>
                <div className="todo-list p-3">
                    <h1 className="d-flex justify-content-center fs-1"> TODOS</h1>
                    <form onSubmit={addTask}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter a task"
                        />

                    </form>
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index} className={task.completed ? 'completed' : ''}>

                                <span>{task.text}</span>
                                <button onClick={() => removeTask(index)}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='border'>
                    <p className='footer ms-4 mt-3'>{pendingTasks} Pending Task </p>
                </div>
            </div >
        </div>
    );
};

export default TodoList;