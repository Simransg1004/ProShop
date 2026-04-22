import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from "../components/Loader"

const RegisterScreen = () => {

  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")

  const { userInfo } = useSelector(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [ register, { isLoading } ] = useRegisterMutation() 

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      toast.error("Passwords do not match")
    } else {
      try {
        const res = await register({ name, email, password}).unwrap()
        dispatch(setCredentials({...res}))
        navigate(redirect)
      } catch(err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type='name'
            placeholder='Enter name' 
            value={name}
            onChange={(e)=> setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email' 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password' 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Re-enter password' 
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        { isLoading && <Loader/> }

        <Button type='submit' disabled={isLoading} className="my-2" >Register</Button>

      </Form>

      <Row>
        <Col>
          Already have an account? <Link to={ redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign in
          </Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default RegisterScreen