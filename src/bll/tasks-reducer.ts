import {TaskTypeResponse} from "../api/todolistApi";
import {addTaskAC} from "./allActions";


type TasksStateType = {
    [todoListID: string]: TaskTypeResponse[];
}



const initialState:TasksStateType = {}

export const tasksReducer = (state:TasksStateType=initialState, action:TasksActionType):TasksStateType => {
    switch (action.type) {
        case "ADD-TASK" : return state

        default: return state
    }
}

export type TasksActionType = ReturnType<typeof addTaskAC>