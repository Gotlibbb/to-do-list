import { DomainUpdateTaskModelType, TaskStatuses, TaskType } from '../../helpers/allTypes'
import IconComponent from '../../components/icon/IconComponent'
import React, { useEffect, useState } from 'react'
import Checkbox from '../../components/Checkbox'
import TitleChangeComponent from '../../components/TitleChangeComponent'
import { TaskBlock } from './TaskStyleComponent'

type TaskPropsType = {
  task: TaskType
  removeTask: (task: TaskType) => void
  updateTask: (taskListId: string, taskId: string, model: DomainUpdateTaskModelType) => void
  preview?: boolean
}

const Task = (props: TaskPropsType) => {
  const [checkbox, setCheckbox] = useState<boolean>(false)
  useEffect(() => {
    setCheckbox((props.task.status === TaskStatuses.New && false) || (props.task.status === TaskStatuses.Completed && true))
  }, [props.task.status])
  const [showChangeIn, setShowChangeIn] = useState<boolean>(false)

  const changeStatus = (val: boolean) => {
    const statusChek = () => {
      if (val) return TaskStatuses.Completed
      if (!val) return TaskStatuses.New
    }
    const status = statusChek()
    props.updateTask(props.task.todoListId, props.task.id, { status })
  }

  const changeTask = (title: string) => {
    props.updateTask(props.task.todoListId, props.task.id, { title })
  }

  return <TaskBlock preview={props.preview}>
    {(!props.preview && showChangeIn && <TitleChangeComponent
      hidden={() => setShowChangeIn(false)}
      initTitle={props.task.title}
      updateTitle={changeTask}/>) ||
    (checkbox ? <s>{props.task.title}</s> : <span>{props.task.title}</span>)}
    {!showChangeIn && <div className={'buttonBlock'}>
      <Checkbox checked={checkbox} changeStatus={changeStatus} id={props.task.id}/>
      <IconComponent iconType={'delete'} onClickEvent={() => props.removeTask(props.task)}/>
      {!props.preview && <IconComponent iconType={'change'} onClickEvent={() => setShowChangeIn(true)}/>}
    </div>}
  </TaskBlock>
}

export default React.memo(Task)
