import {AppRootState, AppThunk} from "./store";
import {
    addTaskAC,
    addTodolistAC, appSetErrorAC, appSetStatusAC, changeEntityStatusAC, changeTitleAC,
    deleteTaskAC,
    removetodolistAC, setInitializedAC, setLoggedInAC,
    setTasksAC,
    setTodolistAC,
    updateTaskAC
} from "./allActions";
import {AuthAPI, AuthType, todolistApi, TodoListResponseType, UpdateTaskDomainModelType} from "../api/todolistApi";


export const fetchTasksTC = (id: string): AppThunk =>
    async dispatch => {
        dispatch(changeEntityStatusAC(id, 'idle'))
        dispatch(appSetStatusAC('loading'))
        const res = await todolistApi.getTasks(id)
        dispatch(setTasksAC(id, res.data.items))
        dispatch(appSetStatusAC('succeeded'))
        dispatch(changeEntityStatusAC(id, 'idle'))
    }


export const addTaskTC = (todolistId: string, title: string): AppThunk =>
    async dispatch => {
        try {
            const res = await todolistApi.addTask(todolistId, title)

            if (res.resultCode === 1) {
                dispatch(appSetErrorAC(res.messages[0]))
                dispatch(appSetStatusAC('succeeded'))
                return
            }
            dispatch(addTaskAC(res.data.item.todoListId, res.data.item.title))
        } catch (error: any) {
            dispatch(appSetErrorAC(error.message))
        } finally {
            dispatch(appSetStatusAC('succeeded'))
            dispatch(changeEntityStatusAC(todolistId, 'idle'))
        }
    }


export const deleteTaskTC = (todoListId: string, taskId: string): AppThunk => {
    return async (dispatch) => {
         await todolistApi.deleteTask(todoListId, taskId)
        dispatch(deleteTaskAC(todoListId, taskId))

    }
}

export const updateTaskTC = (todolistId: string, taskId: string, models: UpdateTaskDomainModelType): AppThunk =>
    async (dispatch, getState: () => AppRootState) => {
        dispatch(appSetStatusAC('loading'))
        dispatch(changeEntityStatusAC(todolistId, 'loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

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
        try {
            const res = await todolistApi.updateTask(todolistId, taskId, modelTaskAPI)
            if (res.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, modelTaskAPI))
            }
            dispatch(appSetErrorAC(res.messages[0]))
        } catch (error: any) {
            dispatch(appSetErrorAC(error.message))
        } finally {
            dispatch(appSetStatusAC('succeeded'))
            dispatch(changeEntityStatusAC(todolistId, 'idle'))
        }
    }


export const fetchTodolistsTC = (): AppThunk => {
    return async (dispatch) => {
        dispatch(appSetStatusAC('loading'))
        const res = await todolistApi.getTodolist()
        dispatch(setTodolistAC(res.data))
        dispatch(appSetStatusAC('succeeded'))
    }

}

export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    dispatch(appSetStatusAC('loading'))
    const res = await todolistApi.createTodolist(title)
    dispatch(addTodolistAC(res.data.item))
    dispatch(appSetStatusAC('succeeded'))
}


export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(appSetStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
     await todolistApi.deleteTodolist(todolistId)
    dispatch(removetodolistAC(todolistId))
    dispatch(appSetStatusAC('succeeded'))


}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(appSetStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    await todolistApi.updateTodolist(todolistId, title)
    dispatch(changeTitleAC(todolistId, title))
    dispatch(appSetStatusAC('succeeded'))
    dispatch(changeEntityStatusAC(todolistId, 'idle'))
}


export const authTC = (AuthObj: AuthType):AppThunk => async dispatch => {
    try {
        dispatch(appSetStatusAC('loading'));
        const res = await AuthAPI.auth(AuthObj)

        if (res.data.resultCode === 0) {
            dispatch(setLoggedInAC(true))
            return
        }
        dispatch(appSetErrorAC(res.data.messages[0]))
    } catch (error: any) {
        dispatch(appSetErrorAC(error.message))
    } finally {
        dispatch(appSetStatusAC('idle'));
    }
}


export const initializedAppTC = ():AppThunk => async dispatch => {
    try {
        const res = await AuthAPI.me();
        dispatch(setInitializedAC(true))
        if (res.data.resultCode === 0) {
            dispatch(setLoggedInAC(true))
            return
        }
        dispatch(appSetErrorAC(res.data.messages[0]))
    } catch (error: any) {
        dispatch(appSetErrorAC(error.message))
    }
}

export const logOutTC = ():AppThunk => async dispatch => {
    try {
        const res = await AuthAPI.logOut();
        dispatch(setInitializedAC(true))
        if (res.data.resultCode === 0) {
            dispatch(setLoggedInAC(false))
            return
        }
        dispatch(appSetErrorAC(res.data.messages[0]))
    } catch (error: any) {
        dispatch(appSetErrorAC(error.message))
    }
}