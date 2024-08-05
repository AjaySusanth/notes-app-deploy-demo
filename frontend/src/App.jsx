import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom"


const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home/>}/>
      <Route path='/signup' exact element={<SignUp/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path="/" element={<Navigate to="/signup" replace />} />
    </Routes>
</Router>
)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}
export default App
