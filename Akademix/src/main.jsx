import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  Home,
  Login,
  Navbar,
  Sidebar
} from './Components/index.js'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter, Router } from 'react-router-dom'

const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navbar/>} />
      <Route path='/Home' element={<Home />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}>
      <App />
    </RouterProvider>
  </StrictMode>
)
