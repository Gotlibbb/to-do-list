import React, { useCallback } from 'react'
import WarningMW from './WarningMW'
import { removeTaskListsTC } from '../../tasksList/tasksListsSlice'
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks'
import { toggleDeleteWarningMW, toggleTaskListMW } from '../../../app/appSlice'

const DeleteTlWarning = () => {
  const dispatch = useAppDispatch()
  const currentTaskListId = useAppSelector<string>(state => state.app.currentTaskListId)

  const removeTaskListHandler = useCallback((taskListId) => {
    dispatch(removeTaskListsTC({ taskListId }))
    dispatch(toggleDeleteWarningMW({ show: false }))
    dispatch(toggleTaskListMW({ show: false }))
  }, [])

  return <WarningMW Y={() => removeTaskListHandler(currentTaskListId)}/>
}

export default React.memo(DeleteTlWarning)
