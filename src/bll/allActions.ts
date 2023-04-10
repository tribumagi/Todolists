

export const addTaskAC= (title:string, todolistId:string) =>  ({type:"ADD-TASK", title, todolistId} as const)
export const deleteTaskAC = (todolistId:string, taskId:string) =>({type:"DELETE-TASK", todolistId, taskId}as const)


export const addTodolistAC= (title:string) =>  ({type:"ADD-TODOLIST", title} as const)
