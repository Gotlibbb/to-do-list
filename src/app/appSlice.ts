import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTaskList } from '../features/tasksList/tasksListsSlice'
import { RequestStatusType } from '../helpers/allTypes'
import { tryCatchHandler } from '../helpers/helper'
import { setAuthorized } from '../features/login/loginSlice'
import { authApi } from '../api/authApi'

export const initializedTC = createAsyncThunk(
  'app/setInitialized',
  async (_, { dispatch }) => {
    dispatch(setStatus({ status: 'loading' }))
    const response = await authApi.authMe()
    dispatch(setInitialized({ initialized: true }))
    tryCatchHandler(dispatch, response, setAuthorized({ authorized: true }), true)
  }
)

export type AppStateType = {
  app: {
    status: RequestStatusType
    error: string | null
    initialized: boolean
  }
  currentTaskListId: string
  modalWindowHandler: ModalWindowsType
}

export type ModalWindowsType = {
  taskListMW: boolean
  deleteWarningMW: boolean
  errorMW: boolean
}

const initialState: AppStateType = {
  app: {
    status: 'succeeded',
    error: null,
    initialized: false
  },
  currentTaskListId: '',
  modalWindowHandler: {
    taskListMW: false,
    deleteWarningMW: false,
    errorMW: false
  }
}

const appSlice = createSlice(
  {
    name: 'app',
    initialState,
    reducers: {
      setStatus (state, action: PayloadAction<{ status: RequestStatusType }>) {
        state.app.status = action.payload.status
      },
      setError (state, action: PayloadAction<{ error: string | null }>) {
        state.app.error = action.payload.error
      },
      setInitialized (state, action: PayloadAction<{ initialized: boolean }>) {
        state.app.initialized = action.payload.initialized
      },
      setCurrentTaskListId (state, action: PayloadAction<{ id: string }>) {
        state.currentTaskListId = action.payload.id
      },
      toggleTaskListMW (state, action: PayloadAction<{ show: boolean }>) {
        state.modalWindowHandler.taskListMW = action.payload.show
      },
      toggleDeleteWarningMW (state, action: PayloadAction<{ show: boolean }>) {
        state.modalWindowHandler.deleteWarningMW = action.payload.show
      }
    },

    extraReducers: (builder) => {
      builder.addCase(addTaskList, (state, action) => {
        state.currentTaskListId = action.payload.id
      })
    }
  }
)

export const {
  toggleTaskListMW,
  setCurrentTaskListId,
  toggleDeleteWarningMW,
  setStatus,
  setError,
  setInitialized
} = appSlice.actions
export default appSlice.reducer
