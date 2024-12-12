import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { AddUser } from "./pages/AddUser"
import { Signin } from "./pages/Signin"
import { Users } from "./pages/Users"
import { EditUser } from "./pages/EditUser"
import { Testing } from "./pages/Testing"
import { AboutUser } from "./pages/AboutUser"
import OrderForm from './components/OrderForm/OrderForm'
import MenuItemsList from './components/Menu/MenuItemsList'
import { TableManagement } from "./pages/Table"
import AdminTablePage from "./pages/EditTable"
import SignupPage from "./pages/Signup"
import { jwtDecrypt } from "jose";
import { JWT_SECRET } from "./config";
import { ProtectedRoute } from "./components/ProtectedRoutes"
import { OwnerDashboard } from "./pages/OwnerDashboard"

interface DecodedToken {
  userId: number;
  email: string
  role: string;
}

async function getDecodedToken(token: string): Promise<DecodedToken | null> {
  const secretKey = new TextEncoder().encode(JWT_SECRET); // Replace with your secret key
  try {
    const { payload } = await jwtDecrypt(token, secretKey);
    return payload as unknown as DecodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

const token = localStorage.getItem("authToken");
const decodedToken = token ? await getDecodedToken(token) : null;
if (decodedToken) {
  console.log("User role:", decodedToken.role);
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/users" element={<ProtectedRoute> <Users /> </ProtectedRoute>} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/user/:id" element={<AboutUser />} />
          <Route path="/testing" element={<Testing />} />
          <Route path='/' element={<MenuItemsList />}></Route>
          <Route path='/order' element={<OrderForm />}></Route>
          <Route path='/table' element={<TableManagement />}></Route>
          <Route path='/edittable' element={<AdminTablePage />}></Route>
          <Route path='/dashboard' element={<ProtectedRoute> <OwnerDashboard /> </ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
