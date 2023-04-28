import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "../../bll/store";
import {TodoListResponseType} from "../../api/todolistApi";
import Todolist from "../todolist/todolist";
import {Container, Grid, Paper} from "@mui/material";
import {TodoListsType} from "../../bll/reducers/todolists-reducer";
import {addTodolistTC, fetchTodolistsTC} from "../../bll/allThunks";
import {AddItemForm} from "../addItemForm/addItemForm";
import {Navigate} from "react-router-dom";
export type todolistStateType = TodoListResponseType & { filter: any, status: any }


export const Todolists = () => {
    const selectTodoLists = (state: AppRootState) => state.todolists
    const todolists = useSelector<AppRootState, TodoListsType>(selectTodoLists)
    const isLogged = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    const dispatch = AppDispatch();

    useEffect(() => {
        if (!isLogged) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    if (!isLogged) {
        return <Navigate to={'/'}/>
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    const todolistMap = todolists.length ? todolists.map(t => {
        return (
            <Grid key={t.id} item xs={12} md={4}>
                <Paper elevation={5} sx={{
                    width: 350,
                }}>
                    <Todolist key={t.id} todolist={t}/>
                </Paper>
            </Grid>
        )
    }) : <div>Add your first Todolist!</div>

    if (!isLogged) {
        return <Navigate to={'/todolist/auth'}/>
    }

    return (
        <Container sx={{padding: '1.5rem 0'}}>
            <AddItemForm addItem={addTodolist} label={'Enter todo list title'}/>
            <Grid container spacing={2}>
                {todolistMap}
            </Grid>
        </Container>
    );
};

export default Todolists;