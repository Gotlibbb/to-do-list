import styled from 'styled-components'
import { DomainUpdateTaskModelType, RequestStatusType, TaskListType, TaskType } from '../../../helpers/allTypes'
import React, { useState } from 'react'
import IconComponent from '../../../components/icon/IconComponent'
import Task from '../../task/Task'
import TitleChangeComponent from '../../../components/TitleChangeComponent'
import Preloader from '../../../components/preloader/Preloader'

const TaskListMWBlock = styled.div`
  margin: 2.1rem 1.5rem;
  min-height: 30vh;
  .preloaderInMW{
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
  }
`
const TaskListTitleBlock = styled.div`
  .taskListTitle {
    display: flex;
    align-items: center;

    img {
      padding-right: 15px;
    }

    h2 {
      width: 80%;
      font-size: 2rem;
      margin: 0;
    }

    padding-bottom: 30px;
  }

`

const AddTaskBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  input::placeholder {
    font-size: 2rem;
  }

  input:focus {
    border-color: black;
  }

  input {
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 2px solid #5f656a;
    width: 70%;
    font-size: 2rem;
  }
  .errorInMW{
    position: fixed;
    color: tomato;
    top: 0;
    left: 0;
    font-size: 1.1rem;
  }
`
const TasksBlock = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`

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
      <input type="text"
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
