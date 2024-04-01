import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice.js'
import GoogleAuth from '../Components/GoogleAuth.jsx'

export default function SignIn() {
  const [data,setData]=useState({})
  // const [loading,setLoading]=useState(false)
  // const [error,setError]=useState(null)
  const {loading,error}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleChange=(e)=>{
    setData({
      ...data,
      [e.target.id]:e.target.value
    })


  }
  const handleSubmit=async(e)=>{
    try {
      
      e.preventDefault()//it protect from refreshing the page
     // setLoading(true)
     dispatch(signInStart())
      const res=await fetch('http://localhost:2000/api/signUp',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
       const dataa=await res.json()
       if(dataa.success===false){
          //  setError(dataa.message)  //This how global state help us .
          //  setLoading(false)
          dispatch(signInFailure(dataa.message))
           return;
       }
      //  setLoading(false)
      //  setError(null)
      
      dispatch(signInSuccess(dataa))
       navigate('/login')

    } catch (error) {
      // setError(error.message)
      // setLoading(false)
      dispatch(signInFailure(error.message))
      
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'onChange={handleChange} ></input>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email'onChange={handleChange}></input>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password'onChange={handleChange}></input>
        <button disabled={loading}className=' bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? '..Loading':'SignUp'}</button>
        <GoogleAuth></GoogleAuth>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/login'>
          <span className=' text-blue-700'>Sign In</span>
        </Link>
        
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
