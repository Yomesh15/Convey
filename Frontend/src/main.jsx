import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner";
import { AuthContextProvider } from './Context/authContext.jsx'
import { SocketProvider } from './Context/socketContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SocketProvider>
        <Toaster richColors position="top-right" />
        <App />
      </SocketProvider>
    </AuthContextProvider>
  </BrowserRouter>
)

