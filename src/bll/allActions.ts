import {TaskTypeResponse, TodoListResponseType, UpdateTaskDomainModelType} from "../api/todolistApi";


export const addTaskAC= (title:string, todoListId:string) =>  ({type:"ADD-TASK", title, todoListId} as const)
export const deleteTaskAC = (todoListId:string, taskId:string) =>({type:"DELETE-TASK", todoListId, taskId}as const)
export const updateTaskAC=(todoListId:string, taskId:string, model:UpdateTaskDomainModelType) => ({type:"UPDATE-TASK", todoListId, taskId, model}as const)
export const setTasksAC = (todoListId:string, tasks:TaskTypeResponse) => ({type:"SET-TASKS",todoListId,tasks}as const)
export const setTodolistAC =  (todoList: TodoListResponseType[]) => ({type:"SET-TODOLIST",todoList}as const)



export const RemovetodolistAC = (todolistId:string) => ({type:"REMOVE-TODOLIST",todolistId}as const)


export const addTodolistAC= (todoList:TodoListResponseType) =>  ({type:"ADD-TODOLIST", todoList} as const)
