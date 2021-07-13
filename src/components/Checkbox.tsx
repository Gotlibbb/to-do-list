import styled from 'styled-components'
import React from 'react'

const CheckboxBlock = styled.div`
  input[type=checkbox] {
    display: none;
  }

  input[type=checkbox]:active + label:before {
  }

  input[type=checkbox]:hover + label:before {
    opacity: 0.5;
  }

  input[type=checkbox] + label:before {
    content: "\\2714";
    color: transparent;
    display: inline-block;
    border: 2px solid #5f656a;
    margin-right: 2px;
    font-size: 20px;
    font-weight: 900;
    line-height: 22px;
    height: 20px;
    width: 20px;
    text-align: center;
    vertical-align: middle;
    transition: color ease .3s;
  }

  input[type=checkbox]:checked + label:before {
    color: #5f656a;
    border-color: #5f656a;
  }
`
type CheckboxPropsType = {
  id: string
  checked: boolean
  changeStatus: (val: boolean) => void
}

const Checkbox = (props: CheckboxPropsType) => {
  return <CheckboxBlock>
    <input type="checkbox"
           id={props.id}
           name={props.id}
           checked={props.checked}
           onChange={e => props.changeStatus(e.currentTarget.checked)}/><label htmlFor={props.id}> </label>
  </CheckboxBlock>
}

export default React.memo(Checkbox)
