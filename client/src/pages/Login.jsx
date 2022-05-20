import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import Loader from '../components/Loader'
import AppService from '../services/AppService'


const Login = () => {

  const user = window.localStorage.getItem('loggeduserinformation')
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = React.useState(false)
  const [dialogContent, setDialogContent] = useState()
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const MyDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogContent?.Title}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContent?.Description}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          {dialogContent?.ContentButton}
        </DialogActions>
      </Dialog>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const user = await AppService.authUser({username, password})
      window.localStorage.setItem('loggeduserinformation', JSON.stringify(user))
    }
    catch(e){
      setDialogContent({
        Title : 'Error',
        Description : 'There was an error in the authentication. You may have entered the wrong credentials.',
        ContentButton : <p className='dialog-button' onClick={handleClose}>Accept</p>,
      })
    }
    finally{
      handleLoad()
    }
  }

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleClickOpen();
    }, 2000);
  };

  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user, navigate])
  

  return (
    <div className='body'>
      <div className="login-page">
        <LoginForm handle={handleSubmit}
          setUsername={setUsername} setPassword={setPassword}/>
      </div>
      {
        loading
          ? <Loader/>
          : null
      }
      {
        MyDialog()
      }
    </div>
  )
}

export default Login