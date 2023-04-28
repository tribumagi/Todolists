import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist, {StatusType} from "./components/todolist/todolist";
import Todolists from "./components/todolists/todolists";
import {Header} from "./components/header/Header";
import {Progress} from "./components/progress/Progress";

import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {LinearProgress, Snackbar} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootState} from "./bll/store";
import {Auth} from "./auth/auth";
import {Snackbars} from "./components/snackBar/Snackbar";




function App() {

    const status = useSelector<AppRootState, StatusType>(state=>state.app.status)

  return (
      <>
          <HashRouter>
              <Header/>
              {status === 'loading' && <LinearProgress/>}
              <Snackbars/>
              <Routes>
                  <Route path='/' element={ <Auth/> }/>
                  <Route path='/todo' element={ <Todolists/> } />
                  <Route path='/404' element={ <h1>Page not found</h1> }/>
                  <Route path='/*' element={ <Navigate to='/404' /> }/>
              </Routes>
          </HashRouter>
      </>
  );
}

export default App;
