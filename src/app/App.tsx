import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import InputChangeBackImage from '../components/themeManipulation/InputChangeBackImage'
import InputAddTaskListContainer from '../features/MainInputAddTaskList/InputAddTaskListContainer'
import { useAppSelector } from '../helpers/hooks'
import TaskListMWContainer from '../features/modalWindow/taskListMW/TaskListMWContainer'
import ChangeBackGroundColor from '../components/themeManipulation/ChangeBackGroundColor'
import TasksListsContainer from '../features/tasksList/TasksListsContainer'
import DeleteTlWarning from '../features/modalWindow/warnings/DeleteTLWarning'

type AppContainerPropsType = {
  imUrl: string | null
  backGroundColor: string | null
}

const AppContainer = styled.div`
  input::selection {
    background: #b6afaf;
  }

  body::selection {
    background: #b6afaf;
  }

  ${(props: AppContainerPropsType) =>
          (props.imUrl && props.imUrl.length > 10) ?
                  css`background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props.imUrl}) fixed;` :
                  css`background: ${props.backGroundColor};`}
  background-size: cover;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const App = () => {
  const [imUrl, setImUrl] = useState<string | null>(localStorage.getItem('imUrl'))
  const [backGroundColor, setBackGroundColor] = useState<string | null>(localStorage.getItem('backGroundColor'))
  const taskListMW = useAppSelector<boolean>(s => s.app.modalWindowHandler.taskListMW)
  const deleteWarningMW = useAppSelector<boolean>(s => s.app.modalWindowHandler.deleteWarningMW)
  useEffect(() => {
    localStorage.setItem('imUrl', (imUrl || '#e2e2e2'))
    localStorage.setItem('backGroundColor', (backGroundColor || '#e2e2e2'))
  }, [imUrl, backGroundColor])

  return <AppContainer imUrl={imUrl} backGroundColor={backGroundColor}>
    <ChangeBackGroundColor setImUrlToNull={setImUrl} activeColor={backGroundColor} onClickEvent={setBackGroundColor}/>
    <InputChangeBackImage setBackGroundColor={setBackGroundColor} onEnterHandler={setImUrl}/>
    <InputAddTaskListContainer/>
    <TasksListsContainer/>
    {taskListMW && <TaskListMWContainer/>}
    {deleteWarningMW && <DeleteTlWarning/>}

  </AppContainer>
}

export default React.memo(App)
