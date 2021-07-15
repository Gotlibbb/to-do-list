import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DomainUpdateTaskModelType, TaskListTypeApi, TaskType } from '../../helpers/allTypes'
import { addTaskList, removeTaskList, setTaskListsTC } from '../tasksList/tasksListsSlice'
import { TaskModelType, todoApi } from '../../api/todoApi'
import { AppRootStateType } from '../../store'
import { setError, setStatus } from '../../app/appSlice'
import { tryCatchHandler } from '../../helpers/helper'

export const setTasksTC = createAsyncThunk<void, { taskListId: string }>(
  'tasks/setTasks',
  async (actions, { dispatch }) => {
    dispatch(setStatus({ status: 'loading' }))
    const taskListId = actions.taskListId
    const response = await todoApi.getTasks(taskListId)
    const tasks = response.data.items
    try {
      dispatch(setStatus({ status: 'succeeded' }))
      dispatch(setTasks({ tasks, taskListId }))
    } catch (error) {
      dispatch(setError({ error: error.message }))
      dispatch(setStatus({ status: 'failed' }))
    }
  }
)

export const addTaskTC = createAsyncThunk<void, { title: string, taskListId: string }>(
  'tasks/addTask',
  async (actions, { dispatch }) => {
    dispatch(setStatus({ status: 'loading' }))
    const response = await todoApi.postTasks(actions.title, actions.taskListId)
    const task = response.data.data.item
    tryCatchHandler(dispatch, response, addTask({ task }))
  }
)

export const removeTaskTC = createAsyncThunk<void, { taskId: string, taskListId: string }>(
  'tasks/removeTask',
  async (actions, { dispatch }) => {
    dispatch(setStatus({ status: 'loading' }))
    const response = await todoApi.deleteTasks(actions.taskListId, actions.taskId)
    tryCatchHandler(dispatch, response, removeTask({ todoListId: actions.taskListId, taskId: actions.taskId }))
  }
)

export const updateTaskTC = createAsyncThunk<void, { taskListId: string, taskId: string, model: DomainUpdateTaskModelType }, { state: AppRootStateType }>(
  'tasks/updateTask',
  async (actions, { dispatch, getState }) => {
    const state = getState()
    const task = state.tasks[actions.taskListId].find(t => t.id === actions.taskId)
    if (!task) {
      return
    }
    const initTask: TaskModelType = {
      status: task.status,
      startDate: task.startDate,
      description: task.description,
      deadline: task.deadline,
      title: task.title,
      priority: task.priority,
      ...actions.model
    }
    dispatch(setStatus({ status: 'loading' }))
    const response = await todoApi.putTasks(actions.taskListId, actions.taskId, initTask)
    tryCatchHandler(dispatch, response, updateTask({
      taskListId: actions.taskListId,
      taskId: actions.taskId,
      model: actions.model
    }))
  }
)

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
        state[task.todoListId] = [task, ...state[task.todoListId]]
      },
      removeTask (state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
        const task = action.payload
        state[task.todoListId] = state[task.todoListId].filter(ts => ts.id !== task.taskId)
      },
      updateTask (state, action: PayloadAction<{ taskListId: string, taskId: string, model: DomainUpdateTaskModelType }>) {
        state[action.payload.taskListId] = state[action.payload.taskListId].map(t => t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t)
      },
      setTasks (state, action: PayloadAction<{ tasks: TaskType[], taskListId: string }>) {
        state[action.payload.taskListId] = action.payload.tasks
      }
    },
    extraReducers: (builder) => {
      // empty array for tasks in new taskList
      builder.addCase(addTaskList, (state, action) => {
        state[action.payload.id] = []
      })
      // delete tasks after deleted taskList
      builder.addCase(removeTaskList, (state, action) => {
        delete state[action.payload.taskListId]
      })
      // add task array for server tasklists
      builder.addCase(setTaskListsTC.fulfilled, (state, action) => {
        action.payload.map((tl: TaskListTypeApi) => state[tl.id] = [])
      })
    }
  }
)

export const {
  addTask,
  removeTask,
  setTasks,
  updateTask
} = tasksSlice.actions

export default tasksSlice.reducer
