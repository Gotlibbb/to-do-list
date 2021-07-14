import React, { useState } from 'react'
import styled, { css } from 'styled-components'

const InputBlock = styled.div`
  
  @keyframes down-input {
    0% {
      margin-top: 80px;
    }
    100% {
      margin-top: 40vh;
    }
  }
  @keyframes up-input {
    0% {
      margin-top: 40vh;
    }
    100% {
      margin-top: 80px;
    }
  }
  
  ${(props: { taskListCount: number }) => props.taskListCount > 0 ?
          css`
              margin-top: 80px;
          ` :
          css`
              animation: down-input 0.4s forwards;
          `
  }
  
  ::placeholder {
    color: #818C99;
    opacity: 0.5;
  }

  input:focus {
    box-shadow: 0 0.1em 0.2em 5px rgba(34, 60, 80, 0.2) inset;
  }

  input {
    width: 80vw;
    padding: 5px 15px;
    border-radius: 27px;
    outline: none;
    font-size: 48px;
    border-width: 0;
    box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.2) inset;
  }
`

type InputTaskListPropsType = {
  onEnterHandler: (title: string) => void
  taskListCount: number
}

const InputAddTaskList = (props: InputTaskListPropsType) => {
  const [localTitle, setLocalTitle] = useState<string>('')
  return <InputBlock taskListCount={props.taskListCount}>
    <input type="text"
           placeholder="Write a new task list... "
           value={localTitle}
           onChange={e => setLocalTitle(e.target.value)}
           onKeyPress={e => {
             if (e.key === 'Enter') {
               setLocalTitle('')
               props.onEnterHandler(e.currentTarget.value)
               e.currentTarget.blur()
             }
           }}/>
  </InputBlock>
}

export default React.memo(InputAddTaskList)
