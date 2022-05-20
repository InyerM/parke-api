import React from 'react'
import { Link } from 'react-router-dom'

const Navlinks = ({icon, text, route, handleLogout}) => {
  return (
    <li className="nav-link" onClick={handleLogout}>
        <Link to={route}>
            <i className={icon} ></i>
            <span className="text nav-text">
                {text}
            </span>
        </Link>
    </li>
  )
}

export default Navlinks