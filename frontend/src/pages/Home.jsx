import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
    <section className='heading'>
            <h1>WHAT DO YOU WANT?</h1>
            <p>Please choose from an option below</p>
          </section>
    
          <Link to='/new-ticket' className='btn btn-reverse btn-block'>
             ADD New Product
          </Link>
    
          <Link to='/tickets' className='btn btn-block primary'>
           View My Products
          </Link>

          <footer>
        <p>&copy; 2023 OUR Company@. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
