import React from 'react';
import Task from "../task/task";
import {AppDispatch, AppRootState} from "../../bll/store";
import {useSelector} from "react-redux";
import {TaskStatuses, TaskTypeResponse} from "../../api/todolistApi";

const Todolist = () => {
    const dispatch = AppDispatch();
const tasks = useSelector<AppRootState, TaskTypeResponse>(state => state.tasks)




   const  tasksMap=tasks.length ?filteredTasks.map(t =>

        <Task
            key={t.id}
            todolistId={id}
            taskId={t.id}
            title={t.title}
            completed={t.status}
        />)

    return (
        <div>
            
        </div>
    );
};

export default Todolist;