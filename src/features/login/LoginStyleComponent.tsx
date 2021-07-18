import styled from 'styled-components'
import React from 'react'

const LoginBlock = styled.div`
  height: 50vh;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6));
  backdrop-filter: blur(0.5rem);
  border-radius: 10px;

  .title {
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 35%;
    width: 90%;

    input {
      font-size: 1.1rem;
      border-width: 0;
      padding: 0.2rem 0.5rem;
      box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.2) inset;
      border-radius: 0.5rem;
      outline: none;
    }

    button:active {
      box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.1) inset;
    }

    button {
      box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.1);
      border-width: 0;
      border-radius: 0.5rem;
      font-size: 1.1rem;
      outline: none;
    }
  }
`

export default React.memo(LoginBlock)
