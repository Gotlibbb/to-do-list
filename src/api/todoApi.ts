import axios from 'axios'
import { TaskListTypeApi, TaskPriorities, TaskStatuses, TaskType } from '../helpers/allTypes'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY
  }
})

export type ApiResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  data: T
}

export type ApiTaskType = {
  totalCount: number
  error: string | number
  items: TaskType[]
}

export type TaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export const todoApi = {
  getTodos () {
    return instance.get<Array<TaskListTypeApi>>('todo-lists')
  },
  postTodos (title: string) {
    return instance.post<ApiResponseType<{ item: TaskListTypeApi }>>('todo-lists', { title })
  },
  deleteTodos (todolistId: string) {
    return instance.delete<ApiResponseType>(`todo-lists/${todolistId}`)
  },
  putTodos (title: string, todolistId: string) {
    return instance.put(`todo-lists/${todolistId}`, { title })
  },
  getTasks (todolistId: string) {
    return instance.get<ApiTaskType>(`todo-lists/${todolistId}/tasks`)
  },
  postTasks (title: string, todolistId: string) {
    return instance.post<ApiResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTasks (todolistId: string, taskId: string) {
    return instance.delete<ApiResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  putTasks (todolistId: string, taskId: string, model: TaskModelType) {
    return instance.put<ApiResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}

export type loginTypeApi = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

export type authMeAPI = {
  id: number
  email: string
  login: string
}
export const authApi = {
  login (login: loginTypeApi) {
    return instance.post<ApiResponseType<{ UserId: number }>>('auth/login', login)
  },
  logout () {
    return instance.delete<ApiResponseType>('auth/login')
  },
  authMe () {
    return instance.get<ApiResponseType<authMeAPI>>('auth/me')
  }
}
