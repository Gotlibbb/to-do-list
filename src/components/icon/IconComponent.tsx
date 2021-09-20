import React from 'react'
import cancel from './icon-cancel.png'
import ok from './icon-ok.png'
import change from './icon-ink.png'
import rubbish from './icon-rubbish.png'
import fullScreen from './full-screen.png'
import plus from './plus.png'
import styled, { css } from 'styled-components'

const Img = styled.img`
  ${(props: { width?: string }) => props.width ? css`width: ${props.width};` : css`width: 22px;`}
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 0.4;
  }
`

type IconComponentPropsType = {
  iconType: 'cancel' | 'ok' | 'delete' | 'change' | 'fullScreen' | 'plus'
  onClickEvent?: () => void
  width?: string
}

const IconComponent = (props: IconComponentPropsType) => {
  const icon =
    (props.iconType === 'cancel' && cancel) ||
    (props.iconType === 'ok' && ok) ||
    (props.iconType === 'change' && change) ||
    (props.iconType === 'fullScreen' && fullScreen) ||
    (props.iconType === 'plus' && plus) ||
    (props.iconType === 'delete' && rubbish)

  return <Img
    width={props.width}
    onClick={props.onClickEvent}
    src={icon || ''}
    alt={props.iconType}/>
}

export default React.memo(IconComponent)
