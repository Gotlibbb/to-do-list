import styled from 'styled-components'
import React, { useState } from 'react'

const Input = styled.input`
  &::placeholder {
    font-size: 1.5rem;
    @media (max-width: 800px ) {
        font-size: 1.2rem;
      }
  }

  &:focus {
    border-color: black;
  }

  font-family: 'Roboto', sans-serif;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid #5f656a;
  width: 90%;
  font-size: 2rem;
  @media (max-width: 800px ) {
        font-size: 1.8rem;
      }
  margin: -1.5px -2px;
  
`

type TaskTitleChangeComponentPropsType = {
  initTitle: string
  updateTitle: (t: string) => void
  hidden: () => void
}

const TitleChangeComponent = (props: TaskTitleChangeComponentPropsType) => {
  const [inVal, setInVal] = useState<string>(props.initTitle)
  const onKeyPress = () => {
    props.updateTitle(inVal)
    props.hidden()
  }

  return <Input autoFocus={true} type="text" value={inVal} onChange={e => setInVal(e.target.value)}
                onKeyPress={e => (e.key === 'Enter' && onKeyPress())}
                onBlur={props.hidden}/>
}

export default React.memo(TitleChangeComponent)
