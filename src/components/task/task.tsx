import React, {ChangeEvent, ChangeEventHandler, FC} from 'react';
import {useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "../../bll/store";
import {updateTaskTC} from "../../bll/allThunks";

type TaskPropsType= {
    todoListId: string
    taskId: string
    title: string,
    completed: number
}

const Task :FC<TaskPropsType> = ({todoListId,taskId,completed, title}) => {
    const dispatch = AppDispatch();


   const deleteTask = () => {

   }

    const changeStatus = (status: number) => {
        dispatch(updateTaskTC(todoListId, taskId, {status}))
    }

    const changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 2 : 0
        changeStatus(status)
    }

    const isChecked = completed === 2;

    const changeStatusHandler = (e: any) => {
        if (e.target.id === 'task') {

            changeStatus(isChecked ? 0 : 2)
        }
    }

    return (
        <li onClick={changeStatusHandler}>
<button onClick={deleteTask}>x</button>
<input type={"checkbox"} checked={isChecked} onChange={changeStatusTask} />
<span>{title}</span>
        </li>
    );
};

export default Task;