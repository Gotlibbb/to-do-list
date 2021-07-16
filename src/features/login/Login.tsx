import { useFormik } from 'formik'
import React from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../helpers/hooks'
import { loginTC } from './loginSlice'

const LoginBlock = styled.div`
  height: 30vh;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 25px;
  padding: 1.5rem;
  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6));
  backdrop-filter: blur(0.5rem);
  border-radius: 10px;

  .title {

  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 60%;
    width: 80%;
    
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
      box-shadow: 0 0.1em 0.2em 2px rgba(34, 60, 80, 0.1) ;
      border-width: 0;
      border-radius: 0.5rem;
      font-size: 1.1rem;
      outline: none;
    }
  }
`

const Login = () => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: values => {
      dispatch(loginTC(values))
    }
  })
  return <LoginBlock>
    <h1 className='title'>Login</h1>
    <form onSubmit={formik.handleSubmit}>
      <input
        placeholder='Email'
        {...formik.getFieldProps('email')}
      />
      <input
        placeholder='Password'
        type='password'
        {...formik.getFieldProps('password')}
      />
      <label> <input
        type='checkbox'
        {...formik.getFieldProps('rememberMe')}
      />Remember me</label>
      <button type={'submit'}>Login</button>
    </form>
  </LoginBlock>
}

export default React.memo(Login)
