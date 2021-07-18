import React, { useEffect, useState } from 'react'
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
import AppContainer from './AppStyleComponent'

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
      <div className='logout' onClick={() => dispatch(logoutTC())}>Out →</div>
      <InputAddTaskListContainer/>
      <TasksListsContainer/>
      {taskListMW && <TaskListMWContainer/>}
      {deleteWarningMW && <DeleteTlWarning/>}
    </>}
    {(status === 'loading' && !mwShow) && <div className={'preloader'}><Preloader/></div>}
    {!mwShow && error && <div className={'error'}>{error}</div>}
    {!authorized && <div className='login'><Login/></div>}
  </AppContainer>
}

export default React.memo(App)
