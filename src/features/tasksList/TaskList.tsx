import { DomainUpdateTaskModelType, TaskListType, TaskType } from '../../helpers/allTypes'
import { useDispatch } from 'react-redux'
import { setTasksTC } from '../task/tasksSlice'
import React, { useEffect } from 'react'
import IconComponent from '../../components/icon/IconComponent'
import Task from '../task/Task'
import { TaskListBlock } from './TaskListStyleComponent'

type TaskListPrevPropsType = {
  taskList: TaskListType
  tasks: TaskType[]
  removeTask: (task: TaskType) => void
  updateTask: (taskListId: string, taskId: string, model: DomainUpdateTaskModelType) => void
  showModalWindowTaskList: (taskListId: string) => void
  setInProcessTaskList: (tl: string) => void
  inProcessTaskListId: string
  showWarningMW: (taskListId: string) => void
}

const TaskList = (props: TaskListPrevPropsType) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTasksTC({ taskListId: props.taskList.id }))
  }, [props.taskList.id])

  return <TaskListBlock inProcessTaskListId={props.inProcessTaskListId} taskListId={props.taskList.id}>
    <div>
      <div className={'titleBlock'}>
        <h2>{props.taskList.title}</h2>
        <IconComponent iconType={'delete'} onClickEvent={() => props.showWarningMW(props.taskList.id)}/>
      </div>
      {props.tasks && props.tasks.map(t => <Task preview key={t.id} task={t} removeTask={props.removeTask}
                                                 updateTask={props.updateTask}/>)}
    </div>
    <div className={'taskListTools'}>
      {props.inProcessTaskListId === props.taskList.id ?
        <span onClick={() => props.setInProcessTaskList('')}>In processing... </span> :
        <IconComponent iconType={'plus'} onClickEvent={() => props.setInProcessTaskList(props.taskList.id)}/>}

      <IconComponent iconType={'fullScreen'} onClickEvent={() => props.showModalWindowTaskList(props.taskList.id)}/>
    </div>
  </TaskListBlock>
}

export default React.memo(TaskList)
