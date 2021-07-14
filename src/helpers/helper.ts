import { Dispatch } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { ApiResponseType } from '../api/todoApi'
import { setError, setStatus } from '../app/appSlice'

export const tryCatchHandler = (dispatch: Dispatch, response: AxiosResponse<ApiResponseType<{}>>, reducer: { payload: any; type: string; }) => {
  try {
    if (response.data.resultCode === 0) {
      dispatch(setStatus({ status: 'idle' }))
      dispatch(reducer)
    } else {
      if (response.data.messages.length) {
        dispatch(setError({ error: response.data.messages[0] }))
        dispatch(setStatus({ status: 'failed' }))
      }
    }
  } catch (error) {
    dispatch(setError({ error: error.message }))
    dispatch(setStatus({ status: 'failed' }))
  }
}
