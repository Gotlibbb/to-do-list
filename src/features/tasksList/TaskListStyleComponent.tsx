import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'

const fadeInAnimation = keyframes`${fadeIn}`

export const TaskListBlock = React.memo(styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 47px;
  @media (max-width: 800px) {
    margin: 15px;
    width: 280px;
  }
  padding: 1.5rem;

  ${(props: { inProcessTaskListId: string, taskListId: string }) => props.inProcessTaskListId === props.taskListId ?
          css`background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9));` :
          css`background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6));`
  }
  backdrop-filter: blur(0.5rem);
  border-radius: 10px;

  .taskListTools {

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;

    span {
      animation: 0.4s ${fadeInAnimation};
      color: #994131;
      font-weight: 1000;
      font-size: 1.3rem;
      cursor: pointer;
    }

    img {
      margin-right: 5px;
    }
  }

  .titleBlock {
    display: flex;
    align-items: center;

    h2 {
      margin-right: 15px;
    }
  }
`)
