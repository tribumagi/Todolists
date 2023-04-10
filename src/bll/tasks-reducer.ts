import {TaskTypeResponse} from "../api/todolistApi";
import {addTaskAC, deleteTaskAC} from "./allActions";


type TasksStateType = {
    [todoListID: string]: TaskTypeResponse[];
}



const initialState:TasksStateType = {}

export const tasksReducer = (state:TasksStateType=initialState, action:TasksActionType):TasksStateType => {
    switch (action.type) {
        case "ADD-TASK" :
            const newTask= {

            }
            return {...state, [action.todolistId]:[...state[action.todolistId], newTask]}

        case "DELETE-TASK": return state

        case "UPDATE-TASK": return {}

        case "SET-TASKS" :

        case "SET-TODOLISTS" :

        case "ADD_TODOLIST" :

        case "REMOVE_TODOLIST" :

        default: return state
    }
}

export type TasksActionType =
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof deleteTaskAC>|

    