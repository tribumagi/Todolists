import {AppThunk} from "./store";
import {addTaskAC, setTasksAC} from "./allActions";
import {todolistApi} from "../api/todolistApi";



export const fetchTasksTC = (id: string):AppThunk =>
    async dispatch => {

        const res = await todolistApi.getTasks(id)
        dispatch(setTasksAC(id, res.data.items))


}

export const addTaskTC = () => {

}

export const deleteTaskTC = () => {

}

export const updateTaskTC = () => {
    
}


export const fetchTodolistsTC = () => {

}

export const addTodolistTC = () => {
    
}

export const removeTodolistTC = () => {
    
}

export const updateTodolistTitleTC = () => {

}