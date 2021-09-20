import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setStatus } from '../../app/appSlice'
import { tryCatchHandler } from '../../helpers/helper'
import { authApi, LoginTypeApi } from '../../api/authApi'

export const loginTC = createAsyncThunk(
  'login/setLogin',
  async (login: LoginTypeApi, { dispatch }) => {
    dispatch(setStatus({ status: 'loading' }))
    const response = await authApi.login(login)
    tryCatchHandler(dispatch, response, setAuthorized({ authorized: true }))
  }
)
export const logoutTC = createAsyncThunk(
  'login/setLogout',
  async (_, { dispatch }) => {
    dispatch(setStatus({ status: 'loading' }))
    const response = await authApi.logout()
    tryCatchHandler(dispatch, response, setAuthorized({ authorized: false }))
  }
)

const loginSlice = createSlice(
  {
    name: 'login',
    initialState: {
      authorized: false
    },
    reducers: {
      setAuthorized (state, action: PayloadAction<{ authorized: boolean }>) {
        state.authorized = action.payload.authorized
      }
    }
  }
)

export const {
  setAuthorized
} = loginSlice.actions
export default loginSlice.reducer
