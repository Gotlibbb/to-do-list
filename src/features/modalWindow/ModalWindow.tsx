import React, { ReactElement } from 'react'
import IconComponent from '../../components/icon/IconComponent'
import { useKeyHandler } from '../../helpers/hooks'
import { ModalContainer, Out, WindowBlock } from './ModalWindowStyleComponents'

const ModalWindow = (props: { children?: ReactElement, closeModalWindow: () => void }) => {
  useKeyHandler(() => props.closeModalWindow(), 'Escape')
  return <ModalContainer>
    <WindowBlock>
      <Out onClick={props.closeModalWindow}>
        <IconComponent iconType={'cancel'}/>
      </Out>
      {props.children}
    </WindowBlock>
  </ModalContainer>
}

export default React.memo(ModalWindow)
