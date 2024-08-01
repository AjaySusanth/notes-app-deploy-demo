import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import PasswordInput from "../../components/PasswordInput"
import { validateEmail } from "../../utils/helper"
import axiosInstance from "../../utils/axiosInstance"

const SignUp = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(null)

  const navigate = useNavigate()

  const handleSignUp = async (e) =>{
    e.preventDefault();

    if(!name){
      setError('Please enter a name')
      return;
    }

    if (!validateEmail(email)){
      setError('Please enter a valid email address')
      return;
    }   

    if (!password){
      setError('Please enter a password')
      return;
    }
    setError('')

    // signup api call

    try{
      const res = await axiosInstance.post('/create-account',{
        fullName:name,
        email:email,
        password:password
      })

      if (res.data && res.data.error){
        setError(res.data.message)
        return;
      }

      if (res.data && res.data.accessToken){
        localStorage.setItem("token",res.data.accessToken)
        navigate('/dashboard')
      }
    }
    catch(err){
      if( err.response && err.response.data && err.response.data.message ){
        setError(err.response.data.message)
      }
      else{
        setError('An unexpected error occured,Try again later')
        console.log(err)
      }
    }
  }


  return (
    <>
      <Navbar/>

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded  bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>

            <h4 className="text-2xl mb-7">Sign Up</h4>

            <input
            type="text"
            placeholder="Name"
            className="input-box"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />

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

            <button type="submit" className="btn-primary">Sign Up</button>

            <p className="text-sm text-center mt-4">Already have an account?{" "}
            <Link to='/login' className="font-medium text-primary underline">Login</Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}
export default SignUp