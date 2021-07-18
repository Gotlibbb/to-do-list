import React from 'react'
import styled, { css } from 'styled-components'

const ChangeBackGroundColorBlock = styled.div`
  position: absolute;
  right: 5px;
  top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div:active {
    box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.4) inset;
  }
  div {
    cursor: pointer;
    margin-right: 5px;
    height: 25px;
    width: 25px;
    border-radius: 14px;
    margin-bottom: 3px;
    //box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.4);
  }
  
  
  .black {
    background: black;
    ${(props: {activeColor: string | null}) => props.activeColor === 'black' && css`box-shadow: none`}
  }

  .white {
    background: #e2e2e2;
    ${(props: {activeColor: string | null}) => props.activeColor === '#e2e2e2' && css`box-shadow: none`}
  }

  .yellow {
    background: #F4B942;
    ${(props: {activeColor: string | null}) => props.activeColor === '#F4B942' && css`box-shadow: none`}
  }

  .blueGreen {
    background: #97D8C4;
    ${(props: {activeColor: string | null}) => props.activeColor === '#97D8C4' && css`box-shadow: none`}
  }
`

type ChangeBackGroundColorPropsType = {
  onClickEvent: (color: string | null) => void
  activeColor: string | null
  setImUrlToNull: (val: null) => void
}

const ChangeBackGroundColor = (props: ChangeBackGroundColorPropsType) => {
  return <ChangeBackGroundColorBlock activeColor={props.activeColor}>
    <div className={'white'} onClick={() => {
      props.onClickEvent('#e2e2e2')
      props.setImUrlToNull(null)
    }}> </div>
    <div className={'black'} onClick={() => {
      props.onClickEvent('black')
      props.setImUrlToNull(null)
    }}> </div>
    <div className={'yellow'} onClick={() => {
      props.onClickEvent('#F4B942')
      props.setImUrlToNull(null)
    }}> </div>
    <div className={'blueGreen'} onClick={() => {
      props.onClickEvent('#97D8C4')
      props.setImUrlToNull(null)
    }}> </div>
  </ChangeBackGroundColorBlock>
}

export default React.memo(ChangeBackGroundColor)
