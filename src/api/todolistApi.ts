import axios from "axios";
import todolist from "../components/todolist/todolist";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': 'ce3c070f-a909-423d-8134-d1162e5ce541',
    },
})

export const todolistApi = {
    getTodolist() {
        return instance.get<TodoListResponseType[]>("todo-lists")
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListResponseType }>>("todo-lists", {title})
            .then((res) => res.data)
    },

    deleteTodolist(todolistId:string) {
return instance.delete<ResponseType>(`todo-lists/${todolistId}` )

    },

    updateTodolist(todolistId:string, title: string) {
return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    .then((res)=>res.data)
    },

    getTasks(todolistId:string) {
return instance.get<getTasksTypeResponse>(`todo-lists/${todolistId}/tasks`)

    },

    addTask(todolistId:string, title:string) {
return instance.put<ResponseType<{ item: TaskTypeResponse }>>(`todo-lists/${todolistId}/tasks`, {title})
    .then((res)=> res.data)
    },

    updateTask(todolistId:string, taskId:string, task: UpdateTaskModelType) {
return instance.put<TaskTypeResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, task)
    .then((res) => res.data)
    },

    deleteTask(todolistId:string, taskId:string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then((res) => res.data)
    }

}


export type AuthType = {
    email: string
    password: string
    rememberMe?: boolean
}
export const AuthAPI = {
    auth(Auth: AuthType) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', Auth)
    },
    me() {
        return instance.get<ResponseType<{id: string, email: string, login: string}>>('auth/me')
    },
    logOut() {
        return instance.delete<ResponseType>('auth/login')
    }
}


export type TodoListResponseType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type getTasksTypeResponse = {
    error: string
    items: TaskTypeResponse[]
    totalCount: number
}

export type TaskTypeResponse = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TodoTaskPriority
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TodoTaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

