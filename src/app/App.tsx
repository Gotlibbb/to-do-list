import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import InputChangeBackImage from '../components/themeManipulation/InputChangeBackImage'
import InputAddTaskListContainer from '../features/mainInputAddTaskList/InputAddTaskListContainer'
import { useAppDispatch, useAppSelector } from '../helpers/hooks'
import TaskListMWContainer from '../features/modalWindow/taskListMW/TaskListMWContainer'
import ChangeBackGroundColor from '../components/themeManipulation/ChangeBackGroundColor'
import TasksListsContainer from '../features/tasksList/TasksListsContainer'
import DeleteTlWarning from '../features/modalWindow/warnings/DeleteTLWarning'
import { setError } from './appSlice'
import Preloader from '../components/preloader/Preloader'
import { RequestStatusType } from '../helpers/allTypes'

type AppContainerPropsType = {
  imUrl: string | null
  backGroundColor: string | null
}

const AppContainer = styled.div`
  ${(props: AppContainerPropsType) =>
          (props.imUrl && props.imUrl[props.imUrl.length - 4] === '.') ?
                  css`background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props.imUrl}) fixed;` :
                  css`background: ${props.backGroundColor};`}
  background-size: cover;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
    .preloader{
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
  }
  .error{
    position: fixed;
    color: tomato;
    top: 0;
    left: 25%;
    font-size: 1.1rem;
  }
`

const App = () => {
  const [imUrl, setImUrl] = useState<string | null>(localStorage.getItem('imUrl'))
  const [backGroundColor, setBackGroundColor] = useState<string | null>(localStorage.getItem('backGroundColor'))
  const taskListMW = useAppSelector<boolean>(s => s.app.modalWindowHandler.taskListMW)
  const deleteWarningMW = useAppSelector<boolean>(s => s.app.modalWindowHandler.deleteWarningMW)
  const status = useAppSelector<RequestStatusType>(state => state.app.app.status)
  const error = useAppSelector<string | null>(state => state.app.app.error)
  const errorMW = useAppSelector<boolean>(state => state.app.modalWindowHandler.errorMW)
  const mwShow = taskListMW || deleteWarningMW || errorMW
  const dispatch = useAppDispatch()
  useEffect(() => {
    localStorage.setItem('imUrl', (imUrl || '#e2e2e2'))
    localStorage.setItem('backGroundColor', (backGroundColor || '#e2e2e2'))
  }, [imUrl, backGroundColor])

  const clearErrorHandler = () => {
    dispatch(setError({ error: null }))
  }

  return <AppContainer imUrl={imUrl} backGroundColor={backGroundColor} onClick={clearErrorHandler}>
    <ChangeBackGroundColor setImUrlToNull={setImUrl} activeColor={backGroundColor} onClickEvent={setBackGroundColor}/>
    <InputChangeBackImage setBackGroundColor={setBackGroundColor} onEnterHandler={setImUrl}/>
    <InputAddTaskListContainer/>
    <TasksListsContainer/>
    {taskListMW && <TaskListMWContainer/>}
    {deleteWarningMW && <DeleteTlWarning/>}
    {status === 'loading' && !mwShow && <div className={'preloader'}><Preloader/></div>}
    {!mwShow && error && <div className={'error'}>{error}</div>}
  </AppContainer>
}

export default React.memo(App)
