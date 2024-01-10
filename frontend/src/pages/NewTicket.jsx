import React, { useState , useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { createTicket , reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import BackButton from '../components/BackButton'

function NewTicket() {
  
  const [image , setImage] = useState("")
  
  const {user} = useSelector(state=>state.auth)
  const {isLoading , isError , isSuccess , message} = useSelector(state => state.ticket)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product , setProduct] = useState('')
  const [description , setDescription] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({product , description}))
  }
  
  useEffect(()=>{

    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())

  },[dispatch , isError , isSuccess , navigate , message])

  if(isLoading){
    return <Spinner/>
  }


  return (
   <>
   <BackButton url={'/'}/>
   <section className="heading">
    <h1>Creating New Product</h1>
    <p>Please Fill Out The Form</p>
   </section>

    <section className="form">
      <div className="form-group">
        <label htmlFor="name">
          User Name
        </label>
        <input type="text" className='form-control' value={name} disabled/>
      </div>
      <div className="form-group">
        <label htmlFor="email">
          User Email
        </label>
        <input type="email" className='form-control' value={email} disabled/>
      </div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="product">
            Product Name
          </label>
          <select name="product" id="product" value={product} onChange={(e)=>setProduct(e.target.value)}>
            <option value="jacket">jacket</option>
            <option value="jens">jens</option>
            <option value="watch">watch</option>
            <option value="Apple mobiles">mobiles</option>
            <option value="shirt">t-shirt</option>
            <option value="follow-up">follow up</option>
            <option value="instgram stuff">instgram stuff</option>
            <option value="Code default">Code default</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">
          description here 
          </label>
          <textarea name="description" id="description" className='form-group' placeholder='Enter Description Here...' value={description} onChange={(e)=>setDescription(e.target.value)}>

          </textarea>
        </div>
        <div className="form-group">
  <label htmlFor="image">
    Image
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
  />
</div>

        <div className="form-group">
          <button className="btn btn-block">
            Raise Ticket
          </button>
          
        </div>
      </form>
    </section>

   </>
  )
}

export default NewTicket
