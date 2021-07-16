import { DomainUpdateTaskModelType, TaskListType, TaskType } from '../../helpers/allTypes'
import { useDispatch } from 'react-redux'
import { setTasksTC } from '../task/tasksSlice'
import React, { useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import IconComponent from '../../components/icon/IconComponent'
import Task from '../task/Task'
import { fadeIn } from 'react-animations'

const fadeInAnimation = keyframes`${fadeIn}`

const TaskListBlock = styled.div`
  min-height: 200px;
  min-width: 300px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 25px;
  padding: 1.5rem;

  ${(props: { inProcessTaskListId: string, taskListId: string }) => props.inProcessTaskListId === props.taskListId ?
          css`background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9));` :
          css`background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6));`
  }
  backdrop-filter: blur(0.5rem);
  border-radius: 10px;

  .taskListTools {

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;

    span {
      animation: 0.4s ${fadeInAnimation};
      color: #994131;
      font-weight: 1000;
      font-size: 1.3rem;
      cursor: pointer;
    }

    img {
      margin-right: 5px;
    }
  }

  .titleBlock {
    display: flex;
    align-items: center;

    h2 {
      margin-right: 15px;
    }
  }
`

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
