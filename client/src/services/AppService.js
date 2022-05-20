import axios from 'axios'
const authUrl = 'http://localhost:3001/api/auth/login'
const config = {
  headers : {
    Authorization : ''
  }
}

const user = window.localStorage.getItem('loggeduserinformation')
let token
if(user){
  const userJson = JSON.parse(user)
  token = `Bearer ${userJson.token}`
}

const getAll = async (url) => {
  config.headers.Authorization = token
  const { data } = await axios.get(url, config)

  return data
}

const getOne = async (url, id) => {
  config.headers.Authorization = token
  console.log(id)
  const { data } = await axios.get(url + `/${id}`, config)

  return data
}

const createNew = async (body, url) => {
  config.headers.Authorization = token
  const { data } = await axios.post(url, body, config)
  
  return data
}

const modify = async (body, url, id) => {
  config.headers.Authorization = token
  const { data } = await axios.put(url + `/${id}`, body, config)
  
  return data
}

const remove = async (url, id) => {
  config.headers.Authorization = token
  const { data } = await axios.delete(url + `/${id}`, config)
  
  return data
}

const authUser = async (credentials) => {
  const { data } = await axios.post(authUrl, credentials)
  
  return data
}

const userServices = { getAll, getOne, createNew, modify, remove, authUser }
export default userServices