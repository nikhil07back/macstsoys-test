import {useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import { getSingleTicket } from '../features/tickets/ticketSlice'

function Ticket() {
  
  const {ticket , isLoading , isError , isSuccess , message} = useSelector(state => state.ticket)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(()=>{

    if(isError){
      toast.error(message)
    }

    dispatch(getSingleTicket(params.id))

    // es-lint-disable-next-line

  },[isError , message , params.id])

  if(isLoading){
    return <Spinner/>
  }

  if(isError){
    return (
      <h1>
        Something Went Wrong
      </h1>
    )
  }

  return (
    <div>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url={'/tickets/'}/>
          <h2>
            Ticket ID : {ticket._id}
            <span className={`status status${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
    <h3>Date Submitted : {new Date(ticket.createdAt).toLocaleDateString('en-IN')} </h3>
    <hr />
    <div className="ticket-desc">
      <h3>Description of Issue</h3>
      <p>{ticket.description}</p>
    </div>
        </header>
      </div>
    </div>
  )
}

export default Ticket
