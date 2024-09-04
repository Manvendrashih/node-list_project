import React from 'react'

function Navbat() {
  return (
   <nav className='bg-violet-600 flex justify-between p-3 px-7'>
    <span className='font-bold text-xl'>My Task</span>
    <ul className='flex gap-7'>
      <li className='hover:font-bold cursor-pointer'>Home</li>
      <li className='hover:font-bold cursor-pointer'>About Us</li>
    </ul>
   </nav>
  )
}

export default Navbat
