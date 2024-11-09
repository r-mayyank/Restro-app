import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Users } from "./pages/Users"
import { EditUser } from "./pages/EditUser"
import { Testing } from "./pages/Testing"
import { AboutUser } from "./pages/AboutUser"
import OrderForm from './components/OrderForm/OrderForm'
import MenuItemsList from './components/Menu/MenuItemsList'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/user/:id" element={<AboutUser />} />
        <Route path="/testing" element={<Testing />} />
        <Route path='/' element = {<MenuItemsList/>}></Route>
        <Route path='/order' element = {<OrderForm/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
