import { useState } from "react"
import AppService from '../services/AppService'
const baseUrl = 'http://localhost:3001/api/users'

const UserEdit = ({ user, title, sender }) => {

  const [username, setUsername] = useState(user?.data.username)
  const [name, setName] = useState(user?.data.name)
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState(user?.data.phone)
  const [email, setEmail] = useState(user?.data.email)
  const [role, setRole] = useState(user?.data.role)
  const [classNameEyeIcon, setClassNameEyeIcon] = useState('uil uil-eye showHidePw')
  const [inputTypePassword, setInputTypePassword] = useState('password')

  const handleEye = () => {
    if (inputTypePassword === 'password'){
      setClassNameEyeIcon('uil uil-eye-slash showHidePw')
      setInputTypePassword('text')
    }
    else{
      setClassNameEyeIcon('uil uil-eye showHidePw')
      setInputTypePassword('password')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data
    if(sender === 'register') {
      try{
        data = await AppService.createNew({username, password, name, phone, role, email}, baseUrl)
        alert('Information created')
      }catch{}
    }
    if(user?.data !== undefined){
      try{
        data = await AppService.modify({username, password, name, phone, role, email}, baseUrl, user?.data.id)
        alert('Information updated')
      }catch{}
    }
  }

  return (
    <div className="form">
      <span className="title">{title}</span>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
            <input type="text" placeholder="Enter a username" required name="username" onChange={(e) => setUsername(e.target.value)} value={username}/>
            <i className="uil uil-user"></i>
        </div>
        <div className="input-field">
            <input type="text" placeholder="Enter a name" required name="name" onChange={(e) => setName(e.target.value)} value={name}/>
            <i className="uil uil-edit-alt"></i>
        </div>
        <div className="input-field">
          <input type={inputTypePassword} className="password" placeholder="Enter a password" required name='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
          <i className="uil uil-lock icon"></i>
          <i className={classNameEyeIcon} onClick={handleEye}></i>
        </div>
        <div className="input-field">
            <input type="text" placeholder="Enter a phone" required name="phone" onChange={(e) => setPhone(e.target.value)} value={phone}/>
            <i className="uil uil-edit-alt"></i>
        </div>
        <div className="input-field">
            <input type="text" placeholder="Enter a email" required name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <i className="uil uil-edit-alt"></i>
        </div>
        <div className="input-field">
            <select required defaultValue={role || 'default'} name='role' onChange={(e) => setRole(e.target.value)}>
              <option value='default' disabled>Select a role...</option>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
            </select>
            <i className="uil uil-edit-alt"></i>
        </div>
        <div className="input-field button">
          <input type="submit" value="Send"/>
        </div>
      </form>
    </div>
  )
}

export default UserEdit