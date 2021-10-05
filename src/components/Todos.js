import React, { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import {
    DatePicker,
} from '@material-ui/pickers';

const columns = [
    { field: 'text', sortable: true, filter: true, floatingFilter: true },
    { field: 'date', sortable: true, filter: true, floatingFilter: true },
    { field: 'priority', sortable: true, filter: true, floatingFilter: true, cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' } },
]

function convertDate(date) {
    return (date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear());
}

function Todos() {

    const [selectedDate, setDate] = React.useState(new Date());
    const [desc, setDesc] = React.useState({ text: '', date: convertDate(selectedDate), priority: '' });
    const [todos, setTodos] = React.useState([]);

    const gridRef = useRef();

    const handleDate = (date) => {
        setDate(date);
        setDesc({ ...desc, date: convertDate(date) });
    }

    const addTodo = (event) => {
        event.preventDefault();
        if (desc.text.length < 3 || desc.priority.length < 3) {
            alert("Please give a description for the task!");
        } else {
            setTodos([...todos, desc]);
        }
    }

    const removeTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, i) => i !== gridRef.current.getSelectedNodes()[0].childIndex));
        } else {
            alert("No row selected!");
        }
    }

    const priorities = [
        { value: "Low", label: "Low" },
        { value: "Normal", label: "Normal" },
        { value: "High", label: "High" }
    ]

    return (
        <div>
            <h1>Simple Todolist</h1>
            <h3>Add new todo</h3>
            <Stack spacing={2} direction="row" justifyContent="center">
                <TextField label="Description" placeholder="Write here..." variant="standard" value={desc.text} onChange={e => setDesc({ ...desc, text: e.target.value })} />
                <DatePicker label="Date" variant="standard" value={selectedDate} onChange={date => { handleDate(date) }} />
                <TextField
                    select
                    label="Priority"
                    variant="standard"
                    value={desc.priority}
                    style={{ width: '200px' }}
                    onChange={e => setDesc({ ...desc, priority: e.target.value })}
                >
                    {priorities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Button onClick={addTodo} variant="contained">Add</Button>
                <Button onClick={removeTodo} variant="contained" color="error">Delete</Button>
            </Stack>
            <h3>Content</h3>
            <div className="ag-theme-material" id="add" style={{ height: '800px', minWidth: '50vh' }}>
                <AgGridReact ref={gridRef} onGridReady={params => gridRef.current = params.api} rowSelection="single" animateRows={true} columnDefs={columns} rowData={todos}>
                </AgGridReact>
            </div>
        </div>
    );
}

export default Todos;