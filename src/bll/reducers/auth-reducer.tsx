import {AppThunk} from "../store";
import {AuthAPI, AuthType} from "../../api/todolistApi";
import {appSetErrorAC, appSetStatusAC, setIsSubmitting, setLoggedInAC} from "../allActions";


type InitialStateType = {
    isLoggedIn: boolean
    isSubmitting: boolean
}

const initState: InitialStateType = {
    isLoggedIn: false,
    isSubmitting: false
}

export const authReducer = (state = initState, action: AuthActionType) => {
    switch (action.type) {
        case 'auth/SET_LOGGED_IN':
            return {...state, isLoggedIn: action.value};
        case "auth/SET_IS_SUBMITTING":
            return {...state, isSubmitting: action.value}
        default:
            return state
    }
}

export type AuthActionType = ReturnType<typeof setLoggedInAC> | ReturnType<typeof setIsSubmitting>