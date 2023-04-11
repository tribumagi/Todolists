import React, {ChangeEventHandler, FC} from 'react';
import {useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "../../bll/store";

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

    const changeStatusTask = () => {

    }

    const isChecked = completed === 2;

    const changeStatusHandler = (e: any) => {
        if (e.target.id === 'task') {

            changeStatusTask(isChecked ? 0 : 2)
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