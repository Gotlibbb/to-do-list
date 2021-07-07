import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaskPriorities, TaskStatuses, TaskType } from '../../helpers/allTypes'
import { addTaskList, removeTaskList } from '../tasksList/tasksListsSlice'
import { v1 } from 'uuid'

export type TasksStateType = {
  // todolistId
  [key: string]: TaskType[]
}

const initialState: TasksStateType = {
  12345: [
    {
      id: v1(),
      title: 'HTML&CSS',
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Low,
      addedDate: '',
      deadline: '',
      description: '',
      startDate: '',
      TaskListId: '12345',
      order: 0
    },
    {
      id: v1(),
      title: 'HTML&CSS',
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Low,
      addedDate: '',
      deadline: '',
      description: '',
      startDate: '',
      TaskListId: '12345',
      order: 0
    },
    {
      id: v1(),
      title: 'HTML&CSS',
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Low,
      addedDate: '',
      deadline: '',
      description: '',
      startDate: '',
      TaskListId: '12345',
      order: 0
    }
  ]
}

const tasksSlice = createSlice(
  {
    name: 'tasks',
    initialState,
    reducers: {
      addTask (state, action: PayloadAction<{ task: TaskType }>) {
        const task = action.payload.task
        state[task.TaskListId] = [task, ...state[task.TaskListId]]
      },
      removeTask (state, action: PayloadAction<{ task: TaskType }>) {
        const task = action.payload.task
        state[task.TaskListId] = state[task.TaskListId].filter(ts => ts.id !== task.id)
      },
      changeTaskTitle (state, action: PayloadAction<{ task: TaskType, newTaskTitle: string }>) {
        const task = action.payload.task
        state[task.TaskListId].map(ts => (ts.id === task.id) && (ts.title = action.payload.newTaskTitle))
      },
      setTaskStatus (state, action: PayloadAction<{ task: TaskType, status: TaskStatuses }>) {
        const task = action.payload.task
        state[task.TaskListId].map(ts => (ts.id === task.id) && (ts.status = action.payload.status))
      }
    },
    extraReducers: (builder) => {
      // empty array for tasks in new taskList
      builder.addCase(addTaskList, (state, action) => {
        state[action.payload.id] = []
      })
      // delete tasks after deleted taskList
      builder.addCase(removeTaskList, (state, action) => {
        delete state[action.payload.taskList.id]
      })
    }
  }
)

export const { addTask, removeTask, changeTaskTitle, setTaskStatus } = tasksSlice.actions
export default tasksSlice.reducer
