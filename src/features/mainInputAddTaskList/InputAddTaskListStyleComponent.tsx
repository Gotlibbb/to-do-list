import React from 'react'
import styled, { css } from 'styled-components'

const InputBlock = styled.div`

  @keyframes down-input {
    0% {
      margin-top: 100px;
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
      margin-top: 100px;
    }
  }

  ${(props: { taskListCount: number }) => props.taskListCount > 0 ?
          css`animation: up-input 0.2s forwards;` : css`animation: down-input 0.4s forwards;`}
  ::placeholder {
    color: #818C99;
    opacity: 0.5;
  }

  input:focus {
    box-shadow: 0 0.1em 0.2em 5px rgba(34, 60, 80, 0.2) inset;
  }

  input {
    @media (max-width: 800px ) {
      font-size: 30px;
      margin-bottom: 30px;
    }
    margin-bottom: 60px;
    width: 80vw;
    padding: 5px 15px;
    border-radius: 1rem;
    outline: none;
    font-size: 48px;
    border-width: 0;
    box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.2) inset;
  }
`

export default React.memo(InputBlock)
