
import {appSetErrorAC, appSetStatusAC, setInitializedAC} from "../allActions";
import {AppThunk} from "../store";
import {AuthAPI} from "../../api/todolistApi";
import {StatusType} from "../../components/todolist/todolist";

export type AppStatusType = {
    initialized: boolean,
    status: StatusType,
    error: null|string
}

export const initialState: AppStatusType = {
    initialized: false,
    status: "idle",
    error: null
}

export const appReducer = (state = initialState, action: AppActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET_INITIALIZED':
            return {...state, initialized: action.value}
        default:
            return {...state}
    }
}

export type AppActionType =
    ReturnType<typeof appSetStatusAC> |
    ReturnType<typeof appSetErrorAC> |
    ReturnType<typeof setInitializedAC>
