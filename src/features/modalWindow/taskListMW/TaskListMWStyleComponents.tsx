import styled from 'styled-components'
import React from 'react'

export const TaskListMWBlock = React.memo(styled.div`
  margin: 2.1rem 1.5rem;
  @media (max-width: 800px ) {
    margin: 1.5rem 1rem;
  }
  min-height: 30vh;

  .preloaderInMW {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
`)
export const TaskListTitleBlock = React.memo(styled.div`
  .taskListTitle {
    display: flex;
    align-items: center;
    width: 80%;

    img {
      padding-right: 15px;
    }

    h2 {

      font-size: 2rem;
      @media (max-width: 800px ) {
        font-size: 1.2rem;
      }
      margin: 0;
    }

    padding-bottom: 30px;
  }

`)

export const AddTaskBlock = React.memo(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  input::placeholder {
    font-size: 2rem;
    @media (max-width: 800px ) {
      font-size: 1.4rem;
    }
  }

  input:focus {
    border-color: black;
  }

  input {
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 2px solid #5f656a;
    width: 80%;
    font-size: 2rem;
    @media (max-width: 800px ) {
      font-size: 1.4rem;
    }
  }

  .errorInMW {
    position: fixed;
    color: tomato;
    top: 0;
    left: 0;
    font-size: 1.1rem;
  }
`)

export const TasksBlock = React.memo(styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`)
