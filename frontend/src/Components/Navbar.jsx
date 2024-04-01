import {FaSearch} from 'react-icons/fa'
import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
export default function Navbar() {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
       <Link to='/'>
     <h1 className='font-bold text-sm sm:text-xl'>
          <span className='text-purple-900'>The</span>
          <span className='text-violet-300'>Estates</span>
        </h1>
        </Link> 

        <form className='text-center bg-slate-100 p-2 rounded-lg flex items-center'>
          <input className='bg-transparent focus:outline-none w-24 sm:w-64' type='text' placeholder='Search....' />
          <FaSearch className=''/>
        </form>

        <ul className='flex gap-4'> 

             <Link to='/'>
             <li className='hidden sm:inline text-purple-900 hover:underline'>Home</li>
              </Link> 
          <Link to='/about'> <li className=' hidden sm:inline text-purple-900 hover:underline'>About</li></Link> 
          <Link to='/profile'>
            {currentUser ? (<img className=' rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>)
            :( <li className='text-purple-900 hover:underline'>Login</li>)
          
          }
            

</Link>
        </ul>
      </div>
    </header>
  );
}
