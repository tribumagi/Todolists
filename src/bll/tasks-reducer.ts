import {TaskStatuses, TaskTypeResponse, TodoTaskPriority} from "../api/todolistApi";
import {
    addTaskAC,
    addTodolistAC,
    deleteTaskAC,
    removetodolistAC,
    setTasksAC,
    setTodolistAC,
    updateTaskAC
} from "./allActions";
import {v1} from "uuid";


type TasksStateType = {
    [todoListID: string]: TaskTypeResponse[];
}



const initialState:TasksStateType = {}

export const tasksReducer = (state:TasksStateType=initialState, action:TasksActionType):TasksStateType => {
    switch (action.type) {
        case "ADD-TASK" :
            const newTask= {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                order: 0, addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: TodoTaskPriority.Low,
                todoListId: action.todoListId,
                completed: false
            }
            return {...state, [action.todoListId]:[newTask, ...state[action.todoListId]]}

        case "DELETE-TASK":  return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}

        case "UPDATE-TASK": return {...state, [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)}

        case "SET-TASKS" : return {...state, [action.todoListId]:action.tasks}

        case "SET-TODOLIST" : const copyState = {...state}
            action.todoList.forEach((tl: { id: string | number; }) => copyState[tl.id] = [] )
            return copyState

        case "ADD-TODOLIST" : return {...state, [action.todoList.id]:[]}

        case "REMOVE-TODOLIST" : delete state[action.todolistId]
            return state

        default: return state
    }
}

export type TasksActionType =
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof deleteTaskAC>|
    ReturnType<typeof setTasksAC>|
    ReturnType<typeof setTodolistAC>|
    ReturnType<typeof updateTaskAC>|
    ReturnType<typeof removetodolistAC>|
    ReturnType<typeof addTodolistAC>



    