import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Logs from '../pages/Logs'
import Register from '../pages/Register'
import User from '../pages/User'
import Vehicles from '../pages/Vehicles'
import Sidebar from './Sidebar'
import NotLoged from './NotLoged'
import ProtectedRoute from './ProtectedRoute'
import LoginWithToken from '../pages/LoginWithToken'

export const App = () => {
  
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/loginWithToken" element={<LoginWithToken />}/>
        <Route path="/home" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>}/>
        <Route path="/vehicles" element={<ProtectedRoute>
          <Vehicles />
        </ProtectedRoute>}/>
        <Route path="/logs" element={<ProtectedRoute>
          <Logs />
        </ProtectedRoute>}/>
        <Route path="/user" element={<ProtectedRoute>
          <User />
        </ProtectedRoute>}/>
        <Route path="/register" element={<ProtectedRoute>
          <Register />
        </ProtectedRoute>}/>
        <Route
          path="*"
          element={
            <main style={{ padding: "5rem" }} className='content'>
              <p>There's nothing here, <Link to='/login'>Return to login</Link></p>
            </main>
          }
        />
      </Routes>
    </>
  )
}
