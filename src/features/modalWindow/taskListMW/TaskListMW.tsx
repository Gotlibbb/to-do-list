import { DomainUpdateTaskModelType, RequestStatusType, TaskListType, TaskType } from '../../../helpers/allTypes'
import React, { useState } from 'react'
import IconComponent from '../../../components/icon/IconComponent'
import Task from '../../task/Task'
import TitleChangeComponent from '../../../components/TitleChangeComponent'
import Preloader from '../../../components/preloader/Preloader'
import { AddTaskBlock, TaskListMWBlock, TaskListTitleBlock, TasksBlock } from './TaskListMWStyleComponents'

type ModalWindowTaskListPropsType = {
  changeTaskListTitle: (title: string, taskListId: string) => void
  tasks: TaskType[]
  taskList: TaskListType | undefined
  addTask: (taskTitle: string) => void
  removeTask: (task: TaskType) => void
  removeTaskListWarning: () => void
  clearError: () => void
  updateTask: (taskListId: string, taskId: string, model: DomainUpdateTaskModelType) => void
  error: string | null
  serverStatus: RequestStatusType
}

const TaskListMW = (props: ModalWindowTaskListPropsType) => {
  const [inValue, setInValue] = useState<string>('')
  const [showChangeIn, setShowChangeIn] = useState<boolean>(false)

  const changeTaskListTitle = (title: string) => {
    props.changeTaskListTitle(title, (props.taskList?.id || ''))
  }

  const addTask = () => {
    props.addTask(inValue)
    setInValue('')
  }

  return <TaskListMWBlock onClick={props.clearError}>
    <div className={'preloaderInMW'}>{props.serverStatus === 'loading' && <Preloader/>}</div>
    <TaskListTitleBlock>
      <div className={'taskListTitle'}>
        {!showChangeIn && <> <IconComponent iconType={'change'} onClickEvent={() => setShowChangeIn(true)}/>
          <IconComponent iconType={'delete'} onClickEvent={() => props.removeTaskListWarning()}/>
        </>}
        {showChangeIn ? <>
            <TitleChangeComponent initTitle={props.taskList?.title || ''}
                                  updateTitle={changeTaskListTitle}
                                  hidden={() => setShowChangeIn(false)}/>
          </> :
          <>
            <h2>{props.taskList?.title} </h2>
          </>
        }
      </div>
    </TaskListTitleBlock>

    <AddTaskBlock>
      <input type='text'
             placeholder={'Write task...'}
             onChange={e => setInValue(e.target.value)}
             value={inValue} onKeyPress={e => e.key === 'Enter' && addTask()}/>
      {props.error && <div className={'errorInMW'}>{props.error}</div>}
    </AddTaskBlock>

    <TasksBlock>
      {props.tasks && props.tasks.map(t => <Task task={t}
                                                 key={t.id}
                                                 removeTask={props.removeTask}
                                                 updateTask={props.updateTask}/>)}
    </TasksBlock>
  </TaskListMWBlock>
}

export default React.memo(TaskListMW)
