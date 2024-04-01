import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import GoogleAuth from '../Components/GoogleAuth'

export default function Login() {
  // const [loading,setLoading]=useState(false)
  // const [error,setError]=useState(null)
  const [data,setData]=useState({})
  const {loading,error}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setData({
      ...data,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault()
      // setLoading(true)\
      dispatch(signInStart())
      const res=await fetch('http://localhost:2000/api/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
    const dataa=await res.json()
   
    if(dataa.success===false){
      // setError(dataa.message)
      // setLoading(false)
      dispatch(signInFailure(dataa.message))
      return;
    }
    // setLoading(false)
    // setError(null)
    dispatch(signInSuccess(dataa))
    navigate('/')
    } catch (error) {
      // setError(error)
      // setLoading(false)
      dispatch(error.message)
      
    }
   
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
        <input type='email'placeholder='email' className=' border p-3 rounded-lg ' id='email'  onChange={handleChange}></input>
        <input type='password'placeholder='password' className=' border p-3 rounded-lg' id='password' onChange={handleChange}></input>
        <button disabled={loading} className='bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? '..Loading':'SignUp'}</button>
        <GoogleAuth></GoogleAuth>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an Account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'>SignUp</span>
        </Link>
      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
