import {TaskTypeResponse, TodoListResponseType, UpdateTaskDomainModelType} from "../api/todolistApi";
import {FilterType, StatusType} from "../components/todolist/todolist";


export const addTaskAC= (todoListId:string, title:string) =>  ({type:"ADD-TASK", title, todoListId} as const)
export const deleteTaskAC = (todoListId:string, taskId:string) =>({type:"DELETE-TASK", todoListId, taskId}as const)
export const updateTaskAC=(todoListId:string, taskId:string, model:UpdateTaskDomainModelType) => ({type:"UPDATE-TASK", todoListId, taskId, model}as const)
export const setTasksAC = (todoListId:string, tasks:TaskTypeResponse[]) => ({type:"SET-TASKS",todoListId,tasks}as const)


export const changeTitleAC = (todoListId:string, title:string) => ({type:"CHANGE-TODOLIST-TITLE",todoListId,title}as const)
export const changeEntityStatusAC = (todoListId:string, status:StatusType) => ({type:"SET-ENTITY-STATUS", todoListId, status}as const)
export const changeFilterAC = (todoListId:string, filter:FilterType) => ({type:"CHANGE-FILTER", todoListId, filter}as const)


export const setTodolistAC =  (todoList: TodoListResponseType[]) => ({type:"SET-TODOLIST",todoList}as const)
export const removetodolistAC = (todolistId:string) => ({type:"REMOVE-TODOLIST",todolistId}as const)
export const addTodolistAC= (todoList:TodoListResponseType) =>  ({type:"ADD-TODOLIST", todoList} as const)


export const appSetStatusAC =  (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const appSetErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setInitializedAC = (value: boolean) =>({type: 'APP/SET_INITIALIZED', value} as const)


export const setLoggedInAC = (value: boolean) => ({type: 'auth/SET_LOGGED_IN', value} as const)
export const setIsSubmitting = (value: boolean) => ({type: 'auth/SET_IS_SUBMITTING', value} as const)