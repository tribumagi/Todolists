import {AppRootState, AppThunk} from "./store";
import {
    addTaskAC,
    addTodolistAC, changeTitleAC,
    deleteTaskAC,
    removetodolistAC,
    setTasksAC,
    setTodolistAC,
    updateTaskAC
} from "./allActions";
import {todolistApi, TodoListResponseType, UpdateTaskDomainModelType} from "../api/todolistApi";



export const fetchTasksTC = (id: string):AppThunk =>
    async dispatch => {
        const res = await todolistApi.getTasks(id)
        dispatch(setTasksAC(id, res.data.items))
}

export const addTaskTC = (todoListId: string, title: string):AppThunk =>
    async dispatch => {
    const res = await todolistApi.addTask(todoListId, title)
    dispatch(addTaskAC(res.data.item.todoListId, res.data.item.title))
}

export const deleteTaskTC = (todoListId: string, taskId:string):AppThunk =>{
   return async (dispatch) => {
        const res = await todolistApi.deleteTask(todoListId, taskId)
        dispatch(deleteTaskAC(todoListId, taskId))

}}

export const updateTaskTC = (todoListId: string, taskId:string, models: UpdateTaskDomainModelType):AppThunk  =>
    async (dispatch,getState: () => AppRootState) => {
        const task = getState().tasks[todoListId].find(t => t.id === taskId)

        if (!task) return
        const modelTaskAPI = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...models
        }

        const res = await todolistApi.updateTask(todoListId, taskId, modelTaskAPI)
        dispatch(updateTaskAC(todoListId, taskId, modelTaskAPI))

    }


export const fetchTodolistsTC = ():AppThunk => {
    return async (dispatch) => {
        const res = await todolistApi.getTodolist()
        dispatch(setTodolistAC(res.data))
    }

}

export const addTodolistTC = (title:string):AppThunk => async dispatch => {
    const res =await todolistApi.createTodolist(title)
    dispatch(addTodolistAC(res.data.item))
}
    


export const removeTodolistTC = (todolistId:string):AppThunk => async dispatch => {
    const res = await todolistApi.deleteTodolist(todolistId)
    dispatch(removetodolistAC(todolistId))
    
}

export const updateTodolistTitleTC = (todoListId:string, title:string):AppThunk => async dispatch =>{
    const res = await todolistApi.updateTodolist(todoListId,title)
    dispatch(changeTitleAC(todoListId, title))

}