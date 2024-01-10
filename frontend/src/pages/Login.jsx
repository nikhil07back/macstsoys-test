import {useState , useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login , reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner'



function Login() {
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user , isLoading , isError , isSuccess , message} = useSelector(state => state.auth)

  const [formData , setFormData] = useState({
    email : "",
    password : "",
  })

  const {email , password} = formData

  const onChange = (e) => {
    setFormData((prevState)=>(
      {
        ...prevState,
        [e.target.name] : e.target.value
      }
    ))
  }

 const handleSubmit = (e) => {
  e.preventDefault()
  dispatch(login(formData))
 }

 useEffect(()=>{
  if(isError){
    toast.error(message)
  }

  // Redirect when logged in
  if(isSuccess || user){
    navigate('/')
  }

  dispatch(reset())

},[isError , isSuccess , isLoading , user , message , navigate , dispatch])



 if(isLoading){
  return (
    <Spinner/>
  )
}
 
 
  return (
    <div>
      <section className='heading'>
            <h1>
              <FaSignInAlt /> Login
            </h1>
            <p>Please Login Here</p>
          </section>
    
          <section className='form'>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  placeholder='Enter password'
                  required
                />
              </div>
              
              <div className='form-group'>
                <button className='btn btn-block'>Login</button>
              </div>
            </form>
          </section>
    </div>
  )
}

export default Login
