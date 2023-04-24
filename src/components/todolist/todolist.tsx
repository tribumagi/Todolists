import React, {FC, useEffect} from 'react';
import Task from "../task/task";
import {AppDispatch, AppRootState} from "../../bll/store";
import {useSelector} from "react-redux";
import {TaskStatuses, TaskTypeResponse} from "../../api/todolistApi";
import {TodoListStateType} from "../../bll/todolists-reducer";
import {fetchTasksTC} from "../../bll/allThunks";

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

    const tasksMap = tasks.length ? filteredTasks.map(t => {
        return (
            <Task
                key={t.id}
                todoListId={t.id}
                taskId={t.id}
                title={t.title}
                completed={t.status}
            />)
    }) : "vvodi"

    return (
        <div>
            {tasksMap}
        </div>
    );
};

export default Todolist;