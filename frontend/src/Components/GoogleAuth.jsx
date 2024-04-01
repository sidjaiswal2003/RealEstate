import React from 'react'
import {GoogleAuthProvider,  getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { signInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function GoogleAuth() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleGoogle=async()=>{
        try {
            const provider= new GoogleAuthProvider()
            const auth=getAuth(app)
            const result = await signInWithPopup(auth,provider)

            const respone=await fetch('http://localhost:2000/api/googleAuth',{
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({name:result.user.displayName,email:result.user.email,img:result.user.photoURL})
            })
            const data=await respone.json()
           
            dispatch(signInSuccess(data))
            navigate('/')

            
        } catch (error) {
            console.log('Could not connect to Google',error)
            
        }


    }
  return (
  
        <button  onClick={handleGoogle} type='button' className='bg-indigo-800 text-white p-3  rounded-lg uppercase hover:opacity-95'>Continue with Google</button>
   
  )
}
