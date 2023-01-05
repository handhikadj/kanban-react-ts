import axios from '@/api/axios'

export interface ITodo {
    id?: number;
    title: string;
    description: string;
    created_by?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ITodoRequest {
    title: string;
    description: string;
}

export const getTodos = async () => {
    const { data } = await axios.get<ITodo[]>('/todos')
    return data
}

export const createTodo = async (todo: ITodoRequest) => {
    return await axios.post<ITodo>('/todos', todo)
}