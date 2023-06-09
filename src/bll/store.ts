import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TasksActionType, tasksReducer} from "./reducers/tasks-reducer";
import {TodolistsActionType, todolistsReducer} from "./reducers/todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppActionType, appReducer} from "./reducers/app-reducer";
import {AuthActionType, authReducer} from "./reducers/auth-reducer";


const rootState = combineReducers({todolists: todolistsReducer, tasks: tasksReducer, app: appReducer, auth: authReducer})

export type AppRootState = ReturnType<typeof rootState>

export const store = legacy_createStore(rootState, applyMiddleware(thunk));

export type AppDispatchType = ThunkDispatch<AppRootState, any, AppRootActionType>

export const AppDispatch = () => useDispatch<AppDispatchType>()

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppRootActionType>



export type AppRootActionType = TodolistsActionType | TasksActionType | AppActionType | AuthActionType