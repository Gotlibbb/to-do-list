import React, { useState } from 'react'
import styled from 'styled-components'

const InputBlock = styled.div`
  position: fixed;
  left: 5px;
  top: 5px;
  
  input:focus {
    box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.2) inset;
  }
  input {
    padding: 5px 5px;
    border: none;
    border-radius: 2rem;
    width: 100px;
    outline: none;
    box-shadow: 0 0.1em 0.2em 1px rgba(34, 60, 80, 0.2) inset;
  }
`

type InputChangeBackImagePropsType = {
  onEnterHandler: (value: string) => void
}

const InputChangeBackImage = (props: InputChangeBackImagePropsType) => {
  const [inpValue, setInpValue] = useState<string>('')
  return <InputBlock>
    <input type='text'
           placeholder='Past url image... '
           value={ inpValue }
           onChange={ e => setInpValue(e.target.value) }
           onKeyPress={ (e) => {
             if (e.key === 'Enter') {
               props.onEnterHandler(e.currentTarget.value)
               setInpValue('')
             }
           }}/>
  </InputBlock>
}

export default React.memo(InputChangeBackImage)
