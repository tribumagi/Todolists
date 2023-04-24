import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from "./components/todolist/todolist";
import Todolists from "./components/todolists/todolists";

function App() {
  return (
    <div className="App">
     <Todolists />
    </div>
  );
}

export default App;
