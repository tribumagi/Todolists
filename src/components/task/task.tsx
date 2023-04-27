import React, {ChangeEvent, ChangeEventHandler, FC, MouseEventHandler} from 'react';
import {useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "../../bll/store";
import {deleteTaskTC, updateTaskTC} from "../../bll/allThunks";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";
import {EditableSpan} from "../editableSpan/EditableSpan";


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

    const updateTask = (title:string) => {
        updateTaskTC(todolistId,taskId, {title})
    }

    return (
        <TaskWrapper onClick={changeStatusHandler} >
            <IconButton onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>

            <Checkbox size='medium' checked={isChecked} onChange={changeStatusTask}/>
            <EditableSpan title={title} changeTitle={updateTask}/>
        </TaskWrapper>
    );
};

const TaskWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #C4C4C4FF;
  }
  
  .completed {
    opacity: 0.5;
    text-decoration: line-through;
  }
`

export default Task;