import axios from '@/api/axios'

export interface ITodoItem {
    id?: number;
    name?: string;
    done?: boolean|null;
    todo_id?: number;
    created_at?: string;
    updated_at?: string;
    progress_percentage?: number;
}

export interface ITodoItemRequest extends ITodoItem {
    target_todo_id?: number;
}

export const getTodoItems = async (todoId: number) => {
    const { data } = await axios.get<ITodoItem[]>(`/todos/${todoId}/items`)
    return data
}

export const createTodoItem = async (todoId: number, todoItem: ITodoItemRequest) => {
    return await axios.post<ITodoItem>(`/todos/${todoId}/items`, todoItem)
}

export const updateTodoItem = async (todoId: number, todoItemId: number, todoItem: ITodoItemRequest) => {
    return await axios.patch<ITodoItem>(`/todos/${todoId}/items/${todoItemId}`, todoItem)
}

export const deleteTodoItem = async (todoId: number, todoItemId: number) => {
    return await axios.delete(`/todos/${todoId}/items/${todoItemId}`)
}