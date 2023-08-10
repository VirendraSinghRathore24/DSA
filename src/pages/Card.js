import React from 'react'
import { NavLink } from 'react-router-dom'


function Card({post}) {
  return (
    <div>
         <div className='relative pointer-events-auto '>
         <NavLink to={`/${post.title.replaceAll(" ", "-")}`}>
                <img src="https://res.cloudinary.com/dixqxdivr/image/upload/v1691590733/woodbg_h94qy0.webp" className='w-[320px] h-[280px] rounded-md' loading='lazy'/>
                    
                <div className='absolute text-stone-950 bottom-0 px-4 text-left'>
                    <p className='text-[30px] font-semibold'>{post.title}</p>
                    <div className='py-10'>
                    
                        <button className='bg-blue-500 h-10 w-[100px] font-semibold rounded-md text-white hover:scale-110 transition duration-300 ease-in'
                        >Explore</button>
                        
                    </div>
                </div>
                </NavLink>
            </div>  
    </div>
  )
}

export default Card