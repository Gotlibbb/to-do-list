import { Dispatch } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { ApiResponseType } from '../api/todoApi'
import { setError, setStatus } from '../app/appSlice'

export const tryCatchHandler = (dispatch: Dispatch, response: AxiosResponse<ApiResponseType<{}>>, reducer: { payload: any; type: string; }, firstVisit?: boolean) => {
  try {
    if (response.data.resultCode === 0) {
      dispatch(reducer)
      dispatch(setStatus({ status: 'idle' }))
    } else {
      if (response.data.messages.length) {
        firstVisit || dispatch(setError({ error: response.data.messages[0] }))
        dispatch(setStatus({ status: 'failed' }))
      }
    }
  } catch (error) {
    dispatch(setError({ error: error.message }))
    dispatch(setStatus({ status: 'failed' }))
  }
}
