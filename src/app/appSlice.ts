import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTaskList } from '../features/tasksList/tasksListsSlice'

export type AppStateType = {
  currentTaskListId: string
  modalWindowHandler: {
    taskListMW: boolean
    deleteWarningMW: boolean
    loginMW: boolean
    errorMW: boolean
  }
}

const initialState: AppStateType = {
  currentTaskListId: '',
  modalWindowHandler: {
    taskListMW: false,
    deleteWarningMW: false,
    loginMW: false,
    errorMW: false
  }
}

const appSlice = createSlice(
  {
    name: 'app',
    initialState,
    reducers: {
      setCurrentTaskListId (state, action: PayloadAction<{ id: string }>) {
        state.currentTaskListId = action.payload.id
      },
      toggleTaskListMW (state, action: PayloadAction<{ show: boolean }>) {
        state.modalWindowHandler.taskListMW = action.payload.show
      },
      toggleDeleteWarningMW (state, action: PayloadAction<{ show: boolean }>) {
        state.modalWindowHandler.deleteWarningMW = action.payload.show
      },
      toggleLoginMW (state, action: PayloadAction<{ show: boolean }>) {
        state.modalWindowHandler.loginMW = action.payload.show
      },
      toggleErrorMW (state, action: PayloadAction<{ show: boolean }>) {
        state.modalWindowHandler.errorMW = action.payload.show
      }
    },
    extraReducers: (builder) => {
      builder.addCase(addTaskList, (state, action) => {
        state.currentTaskListId = action.payload.id
      })
    }
  }
)

export const { toggleTaskListMW, toggleLoginMW, toggleErrorMW, setCurrentTaskListId, toggleDeleteWarningMW } = appSlice.actions
export default appSlice.reducer
