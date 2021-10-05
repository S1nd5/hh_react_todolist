import './App.css';
import React, { useState } from 'react';
import Todos from './components/Todos';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function App() {

  const [value, setValue] = useState('home');
  const handleChange = (event, value) => { setValue(value); };

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" style={{ fontWeight: 'bold' }} centered>
          <Tab value="home" label="Home" />
          <Tab value="todos" label="Todos" />
        </Tabs>
      </AppBar>
      {value === 'home' && <div><h1>Welcome to the Todo App!</h1><p>Lorem ipsum dolor simet...</p></div>}
      {value === 'todos' &&  <MuiPickersUtilsProvider utils={DateFnsUtils}><Todos /></MuiPickersUtilsProvider>}
    </div>
  );
}

export default App;
