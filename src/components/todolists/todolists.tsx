import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "../../bll/store";
import {TodoListResponseType} from "../../api/todolistApi";
import Todolist from "../todolist/todolist";
import {Grid, Paper} from "@mui/material";
import {TodoListsType} from "../../bll/todolists-reducer";
import {fetchTodolistsTC} from "../../bll/allThunks";

export type todolistStateType = TodoListResponseType & {filter:any, status:any}



export const Todolists = () => {
    const selectTodoLists = (state: AppRootState) => state.todolists
const todolists =useSelector<AppRootState, TodoListsType>(selectTodoLists)



    const dispatch = AppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

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



    return (
        <div>
            {todolistMap}
        </div>
    );
};

export default Todolists;