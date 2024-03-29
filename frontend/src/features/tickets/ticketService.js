import axios from 'axios'

const API_URL = '/api/ticket/'

const createTicket = async(ticketData , token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, ticketData , config)
    return response.data


}


const getTickets  = async(token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data


}


const getSingleTicket  = async(id ,token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + id, config)
    return response.data


}




const ticketService = {
    createTicket,
    getTickets,
    getSingleTicket
}

export default ticketService