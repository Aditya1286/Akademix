import { useState } from 'react'
import{
  Header,
  Home,
  Login
} from './Components/index'
import { Outlet } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <Header/>
      TOdo: <Outlet/>
    <Footer/>
   </>
  )
}

export default App
