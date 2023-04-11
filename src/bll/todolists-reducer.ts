import {addTodolistAC} from "./allActions";
import {TodoListResponseType} from "../api/todolistApi";

export type TodoListsType = TodoListStateType[];

export type TodoListStateType = TodoListResponseType & {filter: any, entityStatus: any}



const initialState: TodoListsType = []

export const todolistsReducer = (state=initialState,action:TodolistsActionType):TodoListsType => {
    switch(action.type){
        case "ADD-TODOLIST": return state

        case "REMOVE-TODOLIST"

        default: return state
    }
}

export type TodolistsActionType =
    ReturnType<typeof addTodolistAC> |