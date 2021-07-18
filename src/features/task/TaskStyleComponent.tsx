import styled, { css, keyframes } from 'styled-components'
import React from 'react'
import { fadeIn } from 'react-animations'

const fadeInAnimation = keyframes`${fadeIn}`

export const TaskBlock = React.memo(styled.div`
  animation: 0.3s ${fadeInAnimation};
  display: flex;
  ${(props: { preview?: boolean }) => props.preview ? css`margin: 10px 0 10px 0;` : css`margin: 15px 0 15px 0;`}
  justify-content: space-between;

  .buttonBlock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${(props: { preview?: boolean }) => props.preview ? css`width: 55px;` : css`width: 90px;`}
  }

  span, s {
    width: 90%;
    margin-right: 5px;
    ${(props: { preview?: boolean }) => props.preview ? css`font-size: 1.3rem;` : css`font-size: 1.5rem;`}
  }

  input {
    width: 100%;
    font-size: 1.5rem;
  }
`)
