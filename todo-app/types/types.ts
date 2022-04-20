export type Task = {
    id: string
    create_at: string
    title: string
    user_id: string | undefined
}

export type Notice ={
    id: string
    create_at:string
    content:string
    user_id:string | undefined
}
