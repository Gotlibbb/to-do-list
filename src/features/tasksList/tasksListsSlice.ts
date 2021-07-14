import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterValuesType, RequestStatusType, TaskListType, TaskListTypeApi } from '../../helpers/allTypes'
import { todoApi } from '../../api/todoApi'
import { setError, setStatus } from '../../app/appSlice'
import { tryCatchHandler } from '../../helpers/helper'

export const setTaskListsTC = createAsyncThunk(
  'taskList/setTaskList',
  async (_, { dispatch }) => {
    dispatch(setStatus({ status: 'loading' }))
    const response = await todoApi.getTodos()
    try {
      dispatch(setTaskLists(response.data))
    } catch (error) {
      dispatch(setError({ error: error.message }))
      dispatch(setStatus({ status: 'failed' }))
    }
    return response.data
  }
)

export const addTaskListsTC = createAsyncThunk(
  'taskList/addTaskList',
  async (title: string, { dispatch }) => {
    const response = await todoApi.postTodos(title)
    tryCatchHandler(dispatch, response, addTaskList(response.data.data.item))
  }
)

export const removeTaskListsTC = createAsyncThunk<void, { taskListId: string }>(
  'taskList/removeTaskList',
  async (actions, { dispatch }) => {
    const response = await todoApi.deleteTodos(actions.taskListId)
    tryCatchHandler(dispatch, response, removeTaskList({ taskListId: actions.taskListId }))
  }
)

export const changeTaskListTitleTC = createAsyncThunk<void, { title: string, taskListId: string }>(
  'taskList/changeTaskListTitle',
  async (actions, { dispatch }) => {
    const [title, taskListId] = [actions.title, actions.taskListId]
    const response = await todoApi.putTodos(title, taskListId)
    tryCatchHandler(dispatch, response, changeTaskListTitle({ title, id: taskListId }))
  }
)

const initialState: TaskListType[] = []

const tasksListsSlice = createSlice(
  {
    name: 'tasksList',
    initialState,
    reducers: {
      addTaskList (state, action: PayloadAction<TaskListTypeApi>) {
        const newTaskList: TaskListType = { ...action.payload, filter: 'all', entityStatus: 'idle' }
        return [newTaskList, ...state]
      },
      removeTaskList (state, action: PayloadAction<{ taskListId: string }>) {
        return state = state.filter(tl => tl.id !== action.payload.taskListId)
      },
      changeTaskListTitle (state, action: PayloadAction<{ id: string, title: string }>) {
        state.map(tl => (tl.id === action.payload.id) && (tl.title = action.payload.title))
      },
      changeTaskListFilter (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
        state.map(tl => (tl.id === action.payload.id) && (tl.filter = action.payload.filter))
      },
      changeTaskListStatus (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
        state.map(tl => (tl.id === action.payload.id) && (tl.entityStatus = action.payload.status))
      },
      setTaskLists (state, action: PayloadAction<TaskListTypeApi[]>) {
        return state = action.payload.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      }
    }
  }
)

export const {
  addTaskList,
  changeTaskListFilter,
  changeTaskListStatus,
  changeTaskListTitle,
  removeTaskList,
  setTaskLists
} = tasksListsSlice.actions
export default tasksListsSlice.reducer
