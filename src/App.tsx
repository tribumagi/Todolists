import React, {useEffect} from 'react';

import './App.css';
import  {StatusType} from "./components/todolist/todolist";
import Todolists from "./components/todolists/todolists";
import {Header} from "./components/header/Header";
import {Progress} from "./components/progress/Progress";

import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "./bll/store";
import {Auth} from "./auth/auth";
import {Snackbars} from "./components/snackBar/Snackbar";
import {initializedAppTC} from "./bll/allThunks";




function App() {

    const status = useSelector<AppRootState, StatusType>(state=>state.app.status)
    const dispatch = AppDispatch();
    const isInit = useSelector<AppRootState, boolean>(state => state.app.initialized)

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    if (!isInit) {
        return <div>
            <Progress/>
        </div>
    }

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
