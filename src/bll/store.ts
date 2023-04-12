import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TasksActionType, tasksReducer} from "./tasks-reducer";
import {TodolistsActionType, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


const rootState = combineReducers({todoLists: todolistsReducer, tasks: tasksReducer})

export type AppRootState = ReturnType<typeof rootState>

export const store = legacy_createStore(rootState, applyMiddleware(thunk));

export type AppDispatchType = ThunkDispatch<AppRootState, any, AppRootActionType>

export const AppDispatch = () => useDispatch<AppDispatchType>()

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppRootActionType>



export type AppRootActionType = TodolistsActionType | TasksActionType