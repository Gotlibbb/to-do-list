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
    padding: 5px 15px;
    border-radius: 27px;
    outline: none;
    font-size: 48px;
    border-width: 0;
    box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.2) inset;
  }
`

type InputTaskListPropsType = {
  onEnterHandler: (value: string) => void
}

const InputTaskList = (props: InputTaskListPropsType) => {
  const [inpValue, setInpValue] = useState<string>('')
  return <InputBlock>
    <input type='text'
           placeholder='Create new task list... '
           value={ inpValue }
           onChange={ e => setInpValue(e.target.value) }
           onKeyPress={ e => e.key === 'Enter' && props.onEnterHandler(e.currentTarget.value) }/>
  </InputBlock>
}

export default React.memo(InputTaskList)
