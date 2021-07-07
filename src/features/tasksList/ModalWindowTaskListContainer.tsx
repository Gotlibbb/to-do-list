import styled from 'styled-components'
import { ModalWindow } from '../../components/ModalWindow'
import changeTitle from '../../components/icon/icon-ink.png'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks'
import { addTask, changeTaskTitle, removeTask, setTaskStatus, TasksStateType } from '../task/tasksSlice'
import { toggleTaskListMW } from '../../app/appSlice'
import { TaskListType, TaskPriorities, TaskStatuses, TaskType } from '../../helpers/allTypes'
import { useState } from 'react'
import { v1 } from 'uuid'
import { changeTaskListTitle } from './tasksListsSlice'

// Task

const TaskBlock = styled.div`

`

type TaskPropsType = {}

const Task = (props: TaskPropsType) => {
  return <TaskBlock>

  </TaskBlock>
}

// Presentation

const AddTaskListBlock = styled.div`
  margin: 1.5rem;
  border: 1px solid;
`
const AddTaskListTitleBlock = styled.div`
  span {
    font-size: 1.5rem;
  }

  img {
    width: 16px;
    opacity: 0.5;
    padding-left: 15px;
  }

  img:hover {
    opacity: 0.4;
    cursor: pointer;
  }
`

const TasksBlock = styled.div`

`

type ModalWindowTaskListPropsType = {
  changeTaskListTitle: (id: string, taskListTitle: string) => void

  tasks: TaskType[]
  taskList: TaskListType | undefined
  addTask: (taskTitle: string) => void
  removeTask: (task: TaskType) => void
  setTaskStatus: (task: TaskType, status: TaskStatuses) => void
  changeTaskTitle: (task: TaskType, taskTitle: string) => void
}

const ModalWindowTaskList = (props: ModalWindowTaskListPropsType) => {
  const [inValue, setInValue] = useState<string>('')

  return <AddTaskListBlock>
    <AddTaskListTitleBlock>
      <div>{props.taskList?.title || 'Test Task list Title'}</div>
      <img src={changeTitle} alt="change" onClick={() => props.changeTaskListTitle((props.taskList?.id || ''), 'test change taskList title')}/>...
    </AddTaskListTitleBlock>
    <input type="text"
           onChange={e => setInValue(e.target.value)}
           value={inValue} onKeyPress={e => e.key === 'Enter' && props.addTask(inValue)}/>
    <TasksBlock>
      {props.tasks && props.tasks.map(t => <div key={t.id}> {t.title} <button onClick={() => props.removeTask(t)}>x</button>
        <span onClick={() => props.changeTaskTitle(t, 'test change title task')}> \...</span>
        <button
          onClick={() => props.setTaskStatus(t, TaskStatuses.Completed)}> \/ { t.status }</button>
      </div>)}
    </TasksBlock>
  </AddTaskListBlock>
}

// Container

const ModalWindowTaskListContainer = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector<TasksStateType>(state => state.tasks)
  const taskLists = useAppSelector<TaskListType[]>(state => state.tasksList)
  const currentTaskListId = useAppSelector<string>(state => state.app.currentTaskListId)
  const currentTaskList = taskLists.find(e => currentTaskListId === e.id)

  const closeModalWindow = () => {
    dispatch(toggleTaskListMW({ show: false }))
  }

  const addTaskHandler = (title: string) => {
    dispatch(addTask({
      task: {
        id: v1(),
        addedDate: 'addedDate',
        deadline: 'deadline',
        description: 'description',
        order: 123,
        TaskListId: currentTaskListId,
        priority: TaskPriorities.Middle,
        startDate: '01.01.01',
        status: TaskStatuses.New,
        title: title
      }
    }))
  }

  const changeTaskListTitleHandler = (id: string, title: string) => {
    dispatch(changeTaskListTitle({ id, title }))
  }

  const changeTaskTitleHandler = (task: TaskType, newTaskTitle: string) => {
    dispatch(changeTaskTitle({ task, newTaskTitle }))
  }
  const removeTaskHandler = (task: TaskType) => {
    dispatch(removeTask({ task }))
  }
  const setTaskStatusHandler = (task: TaskType, status: TaskStatuses) => {
    dispatch(setTaskStatus({ task, status }))
  }

  return <ModalWindow closeModalWindow={closeModalWindow}>
    <ModalWindowTaskList changeTaskListTitle={changeTaskListTitleHandler}
                         changeTaskTitle={changeTaskTitleHandler}
                         removeTask={removeTaskHandler}
                         setTaskStatus={setTaskStatusHandler}
                         addTask={addTaskHandler}
                         taskList={currentTaskList}
                         tasks={tasks[currentTaskListId]}/>
  </ModalWindow>
}

export {
  ModalWindowTaskListContainer
}
