import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import PasswordInput from "../../components/PasswordInput"
import { validateEmail } from "../../utils/helper"
import { useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import Loader from "../../components/Loader"

const Login = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(null)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault();
    if (!validateEmail(email)){
      setError('Please enter a valid email address')
      return;
    }   

    if (!password){
      setError('Please enter a password')
      return;
    }
    setError('')
    setLoading(true);
    // Login api call

    try{
      const res = await axiosInstance.post('/login',{
        email:email,
        password:password
      })

      if (res.data && res.data.accessToken){
        localStorage.setItem("token",res.data.accessToken)
        navigate('/dashboard')
      }

    }
    catch(err){
      if (err.response && err.response.data && err.response.data.message){
        setError(err.response.data.message)
      }
      else{
        setError('An unexpected error occured, Try again later')
        console.log(err)
      }
    }
    finally{
      setLoading(false)
    }
  }


  return (
    <>
      <Navbar/>
      {loading && <Loader />} 
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded  bg-white px-7 py-10">
          {!loading && (
            <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />

            <PasswordInput
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />

            {error && <p className="text-xs text-red-500 pb-1">{error}</p>}

            <button type="submit" className="btn-primary">Login</button>

            <p className="text-sm text-center mt-4">Not registered yet?{" "}
            <Link to='/signup' className="font-medium text-primary underline">Create an account</Link>
            </p>
            
          </form>
          )}
        </div>
      </div>

    </>
  )
}
export default Login
