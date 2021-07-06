import React, { useState } from 'react'
import styled from 'styled-components'

const InputBlock = styled.div`
  padding-top: 58px;


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
  }

const InputAddTaskList = (props: InputTaskListPropsType) => {
  const [localTitle, setLocalTitle] = useState<string>('')
  return <InputBlock>
    <input type="text"
           placeholder="Write a new task list... "
           value={localTitle}
           onChange={e => setLocalTitle(e.target.value)}
           onKeyPress={(e) => {
             if (e.key === 'Enter') {
               setLocalTitle('')
               props.onEnterHandler(e.currentTarget.value)
               e.currentTarget.blur()
             }
           }}/>
  </InputBlock>
}

export default React.memo(InputAddTaskList)
