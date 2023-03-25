export const addTaskAC= (title:string, todolistId:string) =>  ({type:"ADD-TASK", title, todolistId} as const)

export const addTodolistAC= (title:string) =>  ({type:"ADD-TODOLIST", title} as const)