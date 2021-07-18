import { DomainUpdateTaskModelType, TaskListType, TaskType } from '../../helpers/allTypes'
import { useDispatch } from 'react-redux'
import { setCurrentTaskListId, toggleDeleteWarningMW, toggleTaskListMW } from '../../app/appSlice'
import { useAppSelector } from '../../helpers/hooks'
import { removeTaskTC, TasksStateType, updateTaskTC } from '../task/tasksSlice'
import { setTaskListsTC } from './tasksListsSlice'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import TaskList from './TaskList'

const TaskListsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  @media (max-width: 800px) {
    justify-content: center;
  }
`
const TasksListsContainer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTaskListsTC())
  }, [])
  const tasks = useAppSelector<TasksStateType>(state => state.tasks)
  const taskLists = useAppSelector<TaskListType[]>(state => state.tasksList)

  const showModalWindowTaskList = useCallback((id: string) => {
    dispatch(setCurrentTaskListId({ id }))
    dispatch(toggleTaskListMW({ show: true }))
  }, [])

  const removeTaskHandler = useCallback((task: TaskType) => {
    dispatch(removeTaskTC({ taskId: task.id, taskListId: task.todoListId }))
  }, [])

  const updateTaskHandler = useCallback((taskListId: string, taskId: string, model: DomainUpdateTaskModelType) => {
    dispatch(updateTaskTC({ taskListId, taskId, model }))
  }, [])

  const showDeleteWarningMWHandler = useCallback((id: string) => {
    dispatch(toggleDeleteWarningMW({ show: true }))
    dispatch(setCurrentTaskListId({ id }))
  }, [])

  const [inProcessTaskListId, setInProcessTaskListId] = useState(localStorage.getItem('inProcess') || '')

  const setInProcessTaskList = useCallback((TaskListId: string) => {
    localStorage.setItem('inProcess', TaskListId)
    setInProcessTaskListId(TaskListId)
  }, [])

  return <TaskListsBlock>
    {taskLists && taskLists.map((t) => {
      return <TaskList key={t.id}
                       taskList={t}
                       removeTask={removeTaskHandler}
                       updateTask={updateTaskHandler}
                       tasks={tasks[t.id]}
                       inProcessTaskListId={inProcessTaskListId}
                       setInProcessTaskList={setInProcessTaskList}
                       showWarningMW={showDeleteWarningMWHandler}
                       showModalWindowTaskList={showModalWindowTaskList}/>
    })}
  </TaskListsBlock>
}

export default React.memo(TasksListsContainer)
