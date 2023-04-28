import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist, {StatusType} from "./components/todolist/todolist";
import Todolists from "./components/todolists/todolists";
import {Header} from "./components/header/Header";
import {Progress} from "./components/progress/Progress";

import {LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootState} from "./bll/store";




function App() {

    const status = useSelector<AppRootState, StatusType>(state=>state.app.status)

  return (
    <div className="App">

        <Header />
        {status==="loading" ? <LinearProgress /> : null}
     <Todolists />
    </div>
  );
}

export default App;
