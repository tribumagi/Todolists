import React, {FC, useEffect} from 'react';
import Task from "../task/task";
import {AppDispatch, AppRootState} from "../../bll/store";
import {useSelector} from "react-redux";
import {TaskStatuses, TaskTypeResponse} from "../../api/todolistApi";
import {TodoListStateType} from "../../bll/todolists-reducer";
import {fetchTasksTC, removeTodolistTC, updateTodolistTitleTC} from "../../bll/allThunks";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {Button, Typography} from "@mui/material";
import styled from "styled-components";
import {changeFilterAC} from "../../bll/allActions";

export type FilterType = 'all' | 'completed' | 'active'
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TodoListPropsType = {
    todolist: TodoListStateType
}

const Todolist: FC<TodoListPropsType> = ({todolist}) => {

    const {id, title, filter, entityStatus} = todolist;
    const dispatch = AppDispatch();
    const selectTasks = (todoListId: string) => (state: AppRootState) => state.tasks[todoListId]
    const tasks = useSelector<AppRootState, TaskTypeResponse[]>(selectTasks(id))


    useEffect(() => {
        dispatch(fetchTasksTC(id))
    },[])

    let filteredTasks = tasks;
    if (filter === 'completed') filteredTasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    if (filter === 'active') filteredTasks = tasks.filter(t => t.status === TaskStatuses.New)

    const changeFilter = (filter: FilterType) => dispatch(changeFilterAC(id, filter))

    const removetodolist = () => {
        // eslint-disable-next-line no-restricted-globals
        var result = confirm('Удалить элемент?')
        if (result) {
            dispatch(removeTodolistTC(id))
        }}

     const changeTodoListTitle = (title:string) => {
        dispatch(updateTodolistTitleTC(id,title))
    }

    const tasksMap = tasks.length ? filteredTasks.map(t => {
        return (
            <Task
                key={t.id}
                todolistId={id}
                taskId={t.id}
                title={t.title}
                completed={t.status}
            />)
    }) : "vvodi"

    return (
        <div>
            <button onClick={removetodolist}>x</button>
            <Typography component={'h2'} sx={{
                fontSize: 20,
                fontWeight: 600,
                padding: '0.5rem'
            }}>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
            </Typography>
            {tasksMap}
            <ButtonsWrapper>
                <Button variant={filter === 'all' ? "contained" : 'outlined'} onClick={() => changeFilter('all')} disabled={!tasks.length}>All</Button>
                <Button variant={filter === 'active' ? "contained" : 'outlined'} onClick={() => changeFilter('active')} disabled={!tasks.length}>Active</Button>
                <Button variant={filter === 'completed' ? "contained" : 'outlined'} onClick={() => changeFilter('completed')} disabled={!tasks.length}>Completed</Button>
            </ButtonsWrapper>
        </div>
    );
};

const ButtonsWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  justify-content: center;
  padding: 10px 0;
`

export default Todolist