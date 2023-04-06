import React, { useState, useEffect } from 'react';

const urlBase = "http://assets.breatheco.de/apis/fake/todos/user/";
const apiUsername = "bostonrex";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const fetchTodoApi = async () => {
        try {
            const response = await fetch(`${urlBase}${apiUsername}`);
            const data = await response.json();
            console.log(data);
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };

    const syncTasks = async () => {
        try {
            const response = await fetch(`${urlBase}${apiUsername}`, {
                method: 'PUT',
                body: JSON.stringify(tasks),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error updating tasks');
            }
            fetchTodoApi();

        } catch (error) {
            console.log(error);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const newTasks = [...tasks, { label: inputValue, done: false }];
            setTasks(newTasks);
            setInputValue('');
            await syncTasks(newTasks);
        }
    };

    const removeTask = async (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        await syncTasks(newTasks);
    };

    const removeAllTasks = async () => {
        setTasks([]);
        await syncTasks([]);
    };

    const pendingTasks = tasks.filter((task) => !task.done).length;

    useEffect(() => {
        fetchTodoApi();
    }, []);

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
                            <li key={index} className={task.done ? 'completed' : ''}>
                                <span>{task.label}</span>
                                <button onClick={() => removeTask(index)}>X</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={removeAllTasks}>Clear All Tasks</button>
                </div>
                <div className='border'>
                    <p className='footer ms-4 mt-3'>{pendingTasks} Pending Task </p>
                </div>
            </div >
        </div>
    );
};

export default TodoList;
