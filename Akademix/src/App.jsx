import { useState } from 'react'
import{
  Sidebar,
  Home,
  Login
} from './Components/index'
import {store} from './Store/store'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Provider store={store}>
    <Home/>
   </Provider>
   </>
  )
}

export default App
