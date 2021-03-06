import InputAddTaskList from './InputAddTaskList'
import { setError, toggleTaskListMW } from '../../app/appSlice'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks'
import { addTaskListsTC } from '../tasksList/tasksListsSlice'
import React from 'react'

const InputAddTaskListContainer = () => {
  const dispatch = useAppDispatch()
  const taskListCount = useAppSelector(s => s.tasksList.length)

  const onEnterHandler = (title: string) => {
    dispatch(toggleTaskListMW({ show: true }))
    dispatch(addTaskListsTC(title))
  }

  return <InputAddTaskList
    taskListCount={taskListCount}
    setError={(error) => dispatch(setError({ error }))}
    onEnterHandler={onEnterHandler}
  />
}

export default React.memo(InputAddTaskListContainer)
