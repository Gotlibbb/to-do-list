import React from 'react'
import ModalWindow from '../ModalWindow'
import { useAppDispatch, useKeyHandler } from '../../../helpers/hooks'
import { toggleDeleteWarningMW } from '../../../app/appSlice'
import styled from 'styled-components'

const SureMWBlock = styled.div`
  display: flex;
  height: 300px;
  width: 100%;
  justify-content: center;
  align-items: center;

  div {
    font-size: 1.5rem;
    margin: 15px;
  }

  span:hover {
    color: #c45037;
    cursor: pointer;
  }

  span {
    color: tomato;
  }
`

type WarningMWPropsType = {
  Y: () => void
}

const WarningMW = (props: WarningMWPropsType) => {
  const yes = () => {
    props.Y()
  }

  const no = () => {
    dispatch(toggleDeleteWarningMW({ show: false }))
  }

  const dispatch = useAppDispatch()
  useKeyHandler(yes, 'y')
  useKeyHandler(no, 'n')

  return <ModalWindow closeModalWindow={() => dispatch(toggleDeleteWarningMW({ show: false }))}>
    <SureMWBlock>
      <div>If you are sure, then press key <span onClick={yes}>"Y"</span>, else press key <span onClick={no}>"N"</span>.
      </div>
    </SureMWBlock>
  </ModalWindow>
}

export default WarningMW
