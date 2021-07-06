import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import InputChangeBackImage from '../components/InputChangeBackImage'
import { ChangeBackGroundColor } from '../components/ChangeBackGroundColor'
import { ModalWindowTaskListContainer } from '../features/tasksList/ModalWindowTaskListContainer'
import { InputAddTaskListContainer } from '../components/inputAddTaskList/InputAddTaskListContainer'
import { useAppSelector } from '../helpers/hooks'

type AppContainerPropsType = {
  imUrl: string | null
  backGroundColor: string | null
}
const AppContainer = styled.div`
  input::selection, ::selection {
    background: #b6afaf;
  }

  ${(props: AppContainerPropsType) =>
          (props.imUrl && props.imUrl.length > 3) ?
                  css`background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props.imUrl}) fixed;` :
                  css`background: ${props.backGroundColor};`
  }
  background-size: cover;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`
// const TasksBlock = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
//   flex-wrap: wrap;
// `

const App = () => {
  const [imUrl, setImUrl] = useState<string | null>(localStorage.getItem('imUrl'))
  const [backGroundColor, setBackGroundColor] = useState<string | null>(localStorage.getItem('backGroundColor'))
  const taskListMW = useAppSelector<boolean>(s => s.app.modalWindowHandler.taskListMW)
  const loginMW = useAppSelector<boolean>(s => s.app.modalWindowHandler.loginMW)
  const errorMW = useAppSelector<boolean>(s => s.app.modalWindowHandler.errorMW)
  const showThemeManipulation = (taskListMW || loginMW || errorMW)

  useEffect(() => {
    localStorage.setItem('imUrl', (imUrl || ''))
    localStorage.setItem('backGroundColor', (backGroundColor || ''))
  }, [imUrl, backGroundColor])

  return <AppContainer imUrl={imUrl} backGroundColor={backGroundColor}>
    {taskListMW && <ModalWindowTaskListContainer/>}

    {showThemeManipulation || <>
    <ChangeBackGroundColor setImUrlToNull={setImUrl} activeColor={backGroundColor} onClickEvent={setBackGroundColor}/>
    <InputChangeBackImage setBackGroundColor={setBackGroundColor} onEnterHandler={setImUrl}/>
    </>}

    <InputAddTaskListContainer/>
    {/* <TasksListsContainer/> */}
  </AppContainer>
}

export {
  App
}
