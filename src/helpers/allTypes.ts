export type TaskListTypeApi = {
  id: string
  addedDate: string
  order: number
  title: string
}

export type TaskListType = TaskListTypeApi & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export type FilterValuesType = 'all' | 'active' | 'completed'
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// tasks type

export type DomainUpdateTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export type TaskType = {
  description: string
  title: string
  id: string
  todoListId: string

  status: TaskStatuses
  priority: TaskPriorities
  deadline: string
  order: number
  startDate: string
  addedDate: string
}

export enum TaskStatuses {
  New = 0,
  inProgress = 2,
  Completed = 3,
  Draft = 4,

}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
