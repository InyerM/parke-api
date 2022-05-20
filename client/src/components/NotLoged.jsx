import { Link } from 'react-router-dom'

const NotLoged = () => {
  return (
    <div>
      You are not logged in, <Link to='/login'>return to login</Link>
    </div>
  )
}

export default NotLoged