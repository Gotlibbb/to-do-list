import { DomainUpdateTaskModelType, TaskListType, TaskType } from '../../../helpers/allTypes'
import { useDispatch } from 'react-redux'
import { setCurrentTaskListId, toggleTaskListMW } from '../../../app/appSlice'
import { useAppSelector } from '../../../helpers/hooks'
import { removeTaskTC, TasksStateType, updateTaskTC } from '../../task/tasksSlice'
import { removeTaskListsTC, setTaskListsTC } from '../tasksListsSlice'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import TaskListPreview from './TasksListsPreview'

const TaskListsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 60px;
`

const TasksListsPreviewContainer = () => {
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

  const removeTaskListHandler = useCallback((taskList: TaskListType) => {
    dispatch(removeTaskListsTC({ taskListId: taskList.id }))
  }, [])

  const removeTaskHandler = useCallback((task: TaskType) => {
    dispatch(removeTaskTC({ taskId: task.id, taskListId: task.todoListId }))
  }, [])

  const updateTaskHandler = useCallback((taskListId: string, taskId: string, model: DomainUpdateTaskModelType) => {
    dispatch(updateTaskTC({ taskListId, taskId, model }))
  }, [])

  const [inProcessTaskListId, setInProcessTaskListId] = useState(localStorage.getItem('inProcess') || '')

  const setInProcessTaskList = (TaskListId: string) => {
    localStorage.setItem('inProcess', TaskListId)
    setInProcessTaskListId(TaskListId)
  }

  return <TaskListsContainer>
    {taskLists && taskLists.map((t) => {
      return <TaskListPreview key={t.id}
                              taskList={t}
                              removeTaskList={removeTaskListHandler}
                              removeTask={removeTaskHandler}
                              updateTask={updateTaskHandler}
                              tasks={tasks[t.id]}
                              inProcessTaskListId={inProcessTaskListId}
                              setInProcessTaskList={setInProcessTaskList}
                              showModalWindowTaskList={showModalWindowTaskList}/>
    })}
  </TaskListsContainer>
}

export default React.memo(TasksListsPreviewContainer)
