import { configureStore } from '@reduxjs/toolkit'
import tasksListsReducer from './features/tasksList/tasksListsSlice'
import tasksSliceReducer from './features/task/tasksSlice'
import appSliceReducer from './app/appSlice'
import loginSliceReducer from './features/login/loginSlice'

export const store = configureStore({
  reducer: {
    tasksList: tasksListsReducer,
    tasks: tasksSliceReducer,
    app: appSliceReducer,
    login: loginSliceReducer
  }
})

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
