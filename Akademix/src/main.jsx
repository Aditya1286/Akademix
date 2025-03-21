import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './Components/Store/store.js'
import {
  Home,
  Login,
  Navbar,
  Sidebar,
  // TodoCalendar
} from './Components/index.js'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter, Router } from 'react-router-dom'
const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home/>}/>
      <Route path='/Home' element={<Home />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}>
    <Provider store={store}>
    <Home />      
    </Provider>
    </RouterProvider>
  </StrictMode>
)
