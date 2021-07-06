import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterValuesType, RequestStatusType, TaskListType, TaskListTypeApi } from '../../helpers/allTypes'

const initialState: TaskListType[] = [{
  id: 'adsdasasd',
  addedDate: 'adsdasasd',
  order: 1,
  title: 'adsasdsad',
  filter: 'all',
  entityStatus: 'idle'
}]

const tasksListsSlice = createSlice(
  {
    name: 'tasksList',
    initialState,
    reducers: {
      addTaskList (state, action: PayloadAction<TaskListTypeApi>) {
        const newTaskList: TaskListType = { ...action.payload, filter: 'all', entityStatus: 'idle' }
        return [newTaskList, ...state]
      },
      removeTaskList (state, action: PayloadAction<{ id: string }>) {
        state.filter(tl => tl.id !== action.payload.id)
      },
      changeTaskListTitle (state, action: PayloadAction<{ id: string, title: string }>) {
        state.map(tl => (tl.id === action.payload.id) && (tl.title = action.payload.title))
      },
      changeTaskListFilter (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
        state.map(tl => (tl.id === action.payload.id) && (tl.filter = action.payload.filter))
      },
      changeTaskListStatus (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
        state.map(tl => (tl.id === action.payload.id) && (tl.entityStatus = action.payload.status))
      }
    }
  }
)

export const {
  addTaskList,
  changeTaskListFilter,
  changeTaskListStatus,
  changeTaskListTitle,
  removeTaskList
} = tasksListsSlice.actions
export default tasksListsSlice.reducer
