import styled from 'styled-components'
import React, { ReactElement } from 'react'
import IconComponent from './icon/IconComponent'

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  backdrop-filter: blur(0.5rem);
`
const Window = styled.div`
  position: static;
  border-radius: 10px;
  width: 45vw;
  min-width: 350px;
  min-height: 300px;
  max-height: 90vh;

  &::-webkit-scrollbar {
    width: 0;
  }

  overflow-y: auto;
  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6));
  animation: show-modal 0.5s forwards;
  @keyframes show-modal {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
const Out = styled.span`
  position: absolute;
  right: 2rem;
  top: 2rem;
`
const ModalWindow = (props: { children: ReactElement, closeModalWindow: () => void }) => {
  return <ModalContainer>
    <Window>
      <Out onClick={props.closeModalWindow}>
        <IconComponent iconType={'cancel'}/>
      </Out>
      {props.children}
    </Window>
  </ModalContainer>
}

export default React.memo(ModalWindow)
