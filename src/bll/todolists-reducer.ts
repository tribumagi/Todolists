import {addTodolistAC} from "./allActions";

export type TodoListsType = TodoListStateType[];

export type TodoListStateType = TodoListResponseType & {filter: any, entityStatus: any}

export type TodoListResponseType = {
    addedDate: string
    id: string
    order: number
    title: string
}

const initialState: TodoListsType = []

export const todolistsReducer = (state=initialState,action:TodolistsActionType):TodoListsType => {
    switch(action.type){
        case "ADD-TODOLIST": return state
        default: return state
    }
}

export type TodolistsActionType = ReturnType<typeof addTodolistAC>