import styled, { css } from 'styled-components'
import React from 'react'

type AppContainerPropsType = {
  imUrl: string | null
  backGroundColor: string | null
}

const AppContainer = styled.div`
  @media (max-width: 800px ) {
    font-size: 13px;
  }
  ${(props: AppContainerPropsType) =>
          (props.imUrl && props.imUrl[props.imUrl.length - 4] === '.') ?
                  css`background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props.imUrl}) fixed;` :
                  css`background: ${props.backGroundColor};`}
  background-size: cover;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .error {
    display: flex;
    justify-content: center;
    position: fixed;
    color: tomato;
    top: 45px;
    left: 5px;
    width: 100%;
    font-weight: 800;
    font-size: 1.2rem;
  }

  .login {
    display: flex;
    align-items: center;
    height: 100vh;
  }

  .logout:active {
    box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.4) inset;
  }

  .logout:before {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
  }

  .logout {
    @media (max-width: 800px ) {
      margin-left: 20px;
    }
    position: absolute;
    top: 15px;
    font-size: 1rem;
    background-color: white;
    user-select: none;
    cursor: pointer;
    border-radius: 0.5rem;
    padding: 0.1rem 0.5rem;
    font-weight: 800;
  }
`
export default React.memo(AppContainer)
