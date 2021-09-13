import React from 'react';

function Todos() {

    const [desc, setDesc] = React.useState({ text: '', date: '' });
    const [todos, setTodos] = React.useState([]);

    const addTodo = () => {
        setTodos([...todos, desc]);
    }

    const removeTodo = (id) => {
        setTodos(todos.filter((todo, i) => i !== id));
    }

    return (
        <div>
            <h1>Simple Todolist</h1>
            <h3>Add new todo</h3>
            <div id="add">
                <label>Description</label>
                <input value={desc.text} onChange={e => setDesc({ ...desc, text: e.target.value })} />
            </div>
            <div id="add">
                <label>Date</label>
                <input type="date" value={desc.date} onChange={e => setDesc({ ...desc, date: e.target.value })} />
                <button onClick={addTodo}>Add</button>
            </div>
            <h3>Content</h3>
            <table>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Description</td>
                        <td>Action(s)</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((todo, index) => <tr key={index}><td>{todo.date}</td><td>{todo.text}</td><td><button onClick={() => removeTodo(index)}>Delete</button></td></tr>)
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Todos;