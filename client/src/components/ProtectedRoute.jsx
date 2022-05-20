import React from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const ProtectedRoute = ({children}) => {
  const loggeduser = window.localStorage.getItem('loggeduserinformation')
  if (!loggeduser) {
    return <main style={{ padding: "5rem" }} className='content'>
      <p>You're not logged, <Link to='/login'>Return to login</Link></p>
    </main>
  }

  return <>
    <Sidebar/>
    {children}
  </>
}

export default ProtectedRoute