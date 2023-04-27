import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from "./components/todolist/todolist";
import Todolists from "./components/todolists/todolists";
import {Header} from "./components/header/Header";
import {Progress} from "./components/progress/Progress";

function App() {
  return (
    <div className="App">

        <Header />
     <Todolists />
    </div>
  );
}

export default App;
