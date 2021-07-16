import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import InputChangeBackImage from '../components/themeManipulation/InputChangeBackImage'
import InputAddTaskListContainer from '../features/mainInputAddTaskList/InputAddTaskListContainer'
import { useAppDispatch, useAppSelector } from '../helpers/hooks'
import TaskListMWContainer from '../features/modalWindow/taskListMW/TaskListMWContainer'
import ChangeBackGroundColor from '../components/themeManipulation/ChangeBackGroundColor'
import TasksListsContainer from '../features/tasksList/TasksListsContainer'
import DeleteTlWarning from '../features/modalWindow/warnings/DeleteTLWarning'
import { initializedTC, setError } from './appSlice'
import Preloader from '../components/preloader/Preloader'
import { RequestStatusType } from '../helpers/allTypes'
import { logoutTC } from '../features/login/loginSlice'
import Login from '../features/login/Login'

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

  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .error {
    display: flex;
    justify-content: center;
    position: fixed;
    color: tomato;
    top: 15px;
    left: 0;
    width: 100%;
    font-weight: 800;
    font-size: 1.4rem;
  }
  .login {
    display: flex;
    align-items: center;
    height: 100vh;
  }
  .logout {
    
  }
  .logout:active {
    box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.4) inset;
  }
  .logout {
    background-color: white;
    user-select: none;
    cursor: pointer;
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.4);
    font-weight: 800;
    position: fixed;
    right: 10px;
    bottom: 10px;
    font-size: 1rem;
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
  const initialized = useAppSelector<boolean>(state => state.app.app.initialized)
  const authorized = useAppSelector(state => state.login.authorized)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializedTC())
    localStorage.setItem('imUrl', (imUrl || ''))
    localStorage.setItem('backGroundColor', (backGroundColor || ''))
  }, [imUrl, backGroundColor])

  const clearErrorHandler = () => {
    dispatch(setError({ error: null }))
  }

  return <AppContainer imUrl={imUrl} backGroundColor={backGroundColor} onClick={clearErrorHandler}>
    <ChangeBackGroundColor setImUrlToNull={setImUrl} activeColor={backGroundColor} onClickEvent={setBackGroundColor}/>
    <InputChangeBackImage setBackGroundColor={setBackGroundColor} onEnterHandler={setImUrl}/>
    {!initialized && <div className={'preloader'}><Preloader/></div>}
    {authorized && <>
      <InputAddTaskListContainer/>
      <TasksListsContainer/>
      {taskListMW && <TaskListMWContainer/>}
      {deleteWarningMW && <DeleteTlWarning/>}
    </>}
    {(status === 'loading' && !mwShow) && <div className={'preloader'}><Preloader/></div>}
    {!mwShow && error && <div className={'error'}>{error}</div>}
    {!authorized && <div className='login'><Login/></div>}
    {authorized && <span className='logout' onClick={() => dispatch(logoutTC())}>Logout...</span>}
  </AppContainer>
}

export default React.memo(App)
