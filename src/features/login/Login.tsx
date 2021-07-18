import { useFormik } from 'formik'
import React from 'react'
import { useAppDispatch } from '../../helpers/hooks'
import { loginTC } from './loginSlice'
import LoginBlock from './LoginStyleComponent'

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
    <div>
      <p>To log in get registered
        <a href={'https://social-network.samuraijs.com/'}
           target={'_blank'}> here
        </a>
      </p>
      <p>or use common test account credentials:</p>
      <p>Email: test17031@mail.ru</p>
      <p>Password: 23ycyOTtiBA)</p>
    </div>
  </LoginBlock>
}

export default React.memo(Login)
