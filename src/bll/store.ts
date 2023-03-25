import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionType, tasksReducer} from "./tasks-reducer";
import {TodolistsActionType, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


const rootState = combineReducers({todoLists: todolistsReducer, tasks: tasksReducer})

export type AppRootState = ReturnType<typeof rootState>

export const store = createStore(rootState, applyMiddleware(thunk));

export type AppDispatchType = ThunkDispatch<AppRootState, any, AppRootActionType>

export const AppDispatch = () => useDispatch<AppDispatchType>()

export type AppRootActionType = TodolistsActionType | TasksActionType