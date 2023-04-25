import React, {ChangeEvent, ChangeEventHandler, FC} from 'react';
import {useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "../../bll/store";
import {deleteTaskTC, updateTaskTC} from "../../bll/allThunks";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


type TaskPropsType = {
    todolistId: string
    taskId: string
    title: string,
    completed: number
}

const Task: FC<TaskPropsType> = ({todolistId, taskId, completed, title}) => {
    const dispatch = AppDispatch();


    const deleteTask = () => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }

    const changeStatus = (status: number) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
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
        <div onClick={changeStatusHandler}>
            <IconButton onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>

            <Checkbox size='medium' checked={isChecked} onChange={changeStatusTask}/>
            <span>{title}</span>
        </div>
    );
};

export default Task;