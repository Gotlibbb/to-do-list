import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import InputChangeBackImage from './components/InputChangeBackImage'
import InputTaskList from './components/InputTaskList'
import { ChangeBackGroundColor } from './components/ChangeBackGroundColor'

const AppContainer = styled.div`
  ${(props: {imUrl: string | null, backGroundColor: string | null}) =>
          (props.imUrl && props.imUrl.length > 3) ?
                  css`background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${props.imUrl}) fixed;` :
                  css`background: ${props.backGroundColor};`
  }
  background-size: cover;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  //justify-content: center;
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
  useEffect(() => {
    localStorage.setItem('imUrl', (imUrl || ''))
    localStorage.setItem('backGroundColor', (backGroundColor || ''))
  })
  const event = (val: string) => {
    alert(val)
  }
  return <AppContainer imUrl={imUrl} backGroundColor={backGroundColor}>
    <ChangeBackGroundColor setImUrlToNull={setImUrl} activeColor={backGroundColor} onClickEvent={setBackGroundColor}/>
    <InputChangeBackImage onEnterHandler={setImUrl}/>
    <InputTaskList onEnterHandler={event}/>
  </AppContainer>
}

export default App
