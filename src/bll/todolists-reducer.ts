import {
    addTodolistAC,
    changeEntityStatusAC,
    changeFilterAC,
    changeTitleAC,
    removetodolistAC,
    setTodolistAC
} from "./allActions";
import {TodoListResponseType} from "../api/todolistApi";

export type TodoListsType = TodoListStateType[];

export type TodoListStateType = TodoListResponseType & { filter: any, entityStatus: any }


const initialState: TodoListsType = []

export const todolistsReducer = (state = initialState, action: TodolistsActionType): TodoListsType => {
    switch (action.type) {
        case "ADD-TODOLIST":
            const newTodoList: TodoListStateType = {...action.todoList, filter: 'all', entityStatus: 'idle'}
            return [newTodoList, ...state]

        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.todolistId)

        case "SET-TODOLIST":
            return action.todoList.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)

        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)

        case "SET-ENTITY-STATUS":
            return state.map(tl => tl.id === action.todoListId ? {...tl, entityStatus: action.status} : tl)

        default:
            return state
    }
}

export type TodolistsActionType =
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTitleAC> |
    ReturnType<typeof changeEntityStatusAC> |
    ReturnType<typeof changeFilterAC> |
    ReturnType<typeof setTodolistAC> |
    ReturnType<typeof removetodolistAC>