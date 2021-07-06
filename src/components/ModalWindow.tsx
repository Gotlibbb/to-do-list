import styled from 'styled-components'
import exit from './icon/icon-cancel.png'
import { ReactElement, useEffect } from 'react'

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  //background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(0.3rem);

`
const Window = styled.div`
  border-radius: 10px;
  width: 608px;
  min-height: 300px;

  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6));
  backdrop-filter: blur(0.5rem);
  animation: show-modal 0.3s forwards;

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
  right: 1.5rem;
  top: 1.5rem;
  
  opacity: 0.5;

  img {
    width: 16px;

  }

  *:hover {
    opacity: 0.4;
    cursor: pointer;
  }

`

const ModalWindow = (props: {children: ReactElement, closeModalWindow: () => void }) => {
  // useEffect(() => {
  //   document.addEventListener('keydown', props.closeModalWindow)
  //
  //   return () => {
  //     document.removeEventListener('keydown', props.closeModalWindow)
  //   }
  // }, [])

  return <ModalContainer >
    <Window>
      <Out onClick={props.closeModalWindow}
           onKeyDown={e => e.key === 'Esc' && props.closeModalWindow}>
        <img src={exit} alt="exit"/>
      </Out>
      {props.children}
    </Window>
  </ModalContainer>
}

export {
  ModalWindow
}
