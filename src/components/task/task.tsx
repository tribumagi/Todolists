import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "../../bll/store";

type TaskPropsType= {
    todoListID: string
    taskID: string
    completed: boolean,
    title: string
}

const Task :FC<TaskPropsType> = ({todoListId,taskId,completed, title}) => {
    const dispatch = AppDispatch();


   const deleteTask = () => {

   }

    const changeStatusTask = () => {

    }

    return (
        <li>
<button onClick={deleteTask}>x</button>
<input type={"checkbox"} checked={isChecked} onChange={changeStatusTask} />
<span>{title}</span>
        </li>
    );
};

export default Task;