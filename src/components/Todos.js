import React, { useRef } from 'react';
import TodoTable from './TodoTable';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const columns = [
    { field: 'text', sortable: true, filter: true, floatingFilter: true },
    { field: 'date', sortable: true, filter: true, floatingFilter: true },
    { field: 'priority', sortable: true, filter: true, floatingFilter: true, cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' } },
]

function Todos() {

    const [desc, setDesc] = React.useState({ text: '', date: '', priority: '' });
    const [todos, setTodos] = React.useState([]);

    const gridRef = useRef();

    const addTodo = () => {
        setTodos([...todos, desc]);
    }

    const removeTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, i) => i !== gridRef.current.getSelectedNodes()[0].childIndex));
        } else {
            alert("No row selected!")
        }
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
            </div>
            <div id="add">
                <label>Priority</label>
                <input type="text" value={desc.priority} onChange={e => setDesc({ ...desc, priority: e.target.value })} />
                <button onClick={addTodo}>Add</button>
                <button onClick={removeTodo}>Delete</button>
            </div>
            <h3>Content</h3>
            <div className="ag-theme-material" id="add" style={{ height: '400px', minWidth: '50vh' }}>
                <AgGridReact ref={gridRef} onGridReady={params => gridRef.current = params.api} rowSelection="single" animateRows={true} columnDefs={columns} rowData={todos}>
                </AgGridReact>
            </div>
        </div>
    );
}

export default Todos;