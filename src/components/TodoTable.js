import React from 'react';

export default function TodoTable(props) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Description</td>
                        <td>Priority</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.todos.map((todo, index) => <tr key={index}><td>{todo.date}</td><td>{todo.text}</td><td>{todo.priority}</td></tr>)
                    }
                </tbody>
            </table>
        </div>
    );
}