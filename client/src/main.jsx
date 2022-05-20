import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import './styles/button.css'
import './styles/item.css'
import './styles/loader.css'
import './styles/login.css'
import './styles/pages.css'
import './styles/sidebar.css'
import './styles/table.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
