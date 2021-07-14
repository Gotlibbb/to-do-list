import React, { useState } from 'react'
import styled from 'styled-components'

const InputBlock = styled.div`
  position: absolute;
  left: 10px;
  top: 15px;

  input:focus {
    box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.2) inset;
  }

  input {
    font-size: 15px;
    padding: 5px 5px;
    border: none;
    border-radius: 2rem;
    width: 120px;
    outline: none;
    box-shadow: 0 0.1em 0.2em 1px rgba(34, 60, 80, 0.2) inset;
  }
`

type InputChangeBackImagePropsType = {
  onEnterHandler: (value: string) => void
  setBackGroundColor: (value: string | null) => void
}

const InputChangeBackImage = (props: InputChangeBackImagePropsType) => {
  const [inpValue, setInpValue] = useState<string>('')
  return <InputBlock>
    <input type="text"
           placeholder="Url pic or color... "
           value={inpValue}
           onChange={e => setInpValue(e.target.value)}
           onKeyPress={(e) => {
             if (e.key === 'Enter') {
               props.onEnterHandler(e.currentTarget.value)
               props.setBackGroundColor(e.currentTarget.value[e.currentTarget.value.length - 4] !== '.' ? e.currentTarget.value : '#e2e2e2')
               setInpValue('')
             }
           }}/>
  </InputBlock>
}

export default React.memo(InputChangeBackImage)
