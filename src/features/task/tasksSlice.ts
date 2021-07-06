import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaskType } from '../../helpers/allTypes'
import { addTaskList, removeTaskList } from '../tasksList/tasksListsSlice'

export type TasksStateType = {
  // todolistId
  [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

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
        state[task.TaskListId].filter(ts => ts.id !== task.id)
      },
      changeTask (state, action: PayloadAction<{ task: TaskType, newTask: string }>) {
        const task = action.payload.task
        state[task.TaskListId].map(ts => (ts.id === task.id) && (ts.title = action.payload.newTask))
      }
    },
    extraReducers: (builder) => {
      // empty array for tasks in new taskList
      builder.addCase(addTaskList, (state, action) => {
        state[action.payload.id] = []
      })
      // delete tasks after deleted taskList
      builder.addCase(removeTaskList, (state, action) => {
        delete state[action.payload.id]
      })
    }
  }
)

export const { addTask, removeTask, changeTask } = tasksSlice.actions
export default tasksSlice.reducer
