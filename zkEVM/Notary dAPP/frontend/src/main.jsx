import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Notary from './pages/Notary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Notary/>
  </StrictMode>,
)
