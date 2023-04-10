import React, {FC} from 'react';
import Task from "../task/task";
import {AppDispatch, AppRootState} from "../../bll/store";
import {useSelector} from "react-redux";
import {TaskStatuses, TaskTypeResponse} from "../../api/todolistApi";
import {TodoListStateType} from "../../bll/todolists-reducer";


export type TodoListPropsType = {
    todoList: TodoListStateType
}

const Todolist:FC<TodoListPropsType> = ({id, title, filter, entityStatus}) => {
    const dispatch = AppDispatch();
    const selectTasks = (todoListID: string) => (state: AppRootState) => state.tasks[todoListID]
const tasks = useSelector<AppRootState, TaskTypeResponse[]>(selectTasks(id))




    let filteredTasks = tasks;
    if (filter === 'completed') filteredTasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    if (filter === 'active') filteredTasks = tasks.filter(t => t.status === TaskStatuses.New)

   const  tasksMap = tasks.length ?filteredTasks.map(t =>{
   return (
        <Task
            key={t.id}
            todoListId={t.id}
            taskId={t.id}
            title={t.title}
            completed={t.status}
        />)}) : "vvodi"

    return (
        <div>
            {tasksMap}
        </div>
    );
};

export default Todolist;