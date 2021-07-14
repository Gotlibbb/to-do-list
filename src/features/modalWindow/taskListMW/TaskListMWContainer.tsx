import { useAppDispatch, useAppSelector } from '../../../helpers/hooks'
import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from '../../task/tasksSlice'
import { toggleDeleteWarningMW, toggleTaskListMW } from '../../../app/appSlice'
import { DomainUpdateTaskModelType, TaskListType, TaskType } from '../../../helpers/allTypes'
import { changeTaskListTitleTC } from '../../tasksList/tasksListsSlice'
import React, { useCallback } from 'react'
import ModalWindow from '../ModalWindow'
import TaskListMW from './TaskListMW'

const TaskListMWContainer = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector<TasksStateType>(state => state.tasks)
  const taskLists = useAppSelector<TaskListType[]>(state => state.tasksList)
  const currentTaskListId = useAppSelector<string>(state => state.app.currentTaskListId)
  const currentTaskList = taskLists.find(e => currentTaskListId === e.id)

  const closeModalWindow = () => {
    dispatch(toggleTaskListMW({ show: false }))
  }
  const addTaskHandler = (title: string) => {
    dispatch(addTaskTC({ title, taskListId: currentTaskListId }))
  }
  const changeTaskListTitleHandler = (title: string, taskListId: string) => {
    dispatch(changeTaskListTitleTC({ title, taskListId }))
  }
  const updateTaskHandler = useCallback((taskListId: string, taskId: string, model: DomainUpdateTaskModelType) => {
    dispatch(updateTaskTC({ taskListId, taskId, model }))
  }, [])
  const removeTaskHandler = useCallback((task: TaskType) => {
    dispatch(removeTaskTC({ taskId: task.id, taskListId: task.todoListId }))
  }, [])
  const removeTaskListHandler = useCallback(() => {
    dispatch(toggleDeleteWarningMW({ show: true }))
  }, [])

  return <ModalWindow closeModalWindow={closeModalWindow}>
    <TaskListMW changeTaskListTitle={changeTaskListTitleHandler}
                removeTaskListWarning={removeTaskListHandler}
                updateTask={updateTaskHandler}
                removeTask={removeTaskHandler}
                addTask={addTaskHandler}
                taskList={currentTaskList}
                tasks={tasks[currentTaskListId]}/>
  </ModalWindow>
}

export default React.memo(TaskListMWContainer)
