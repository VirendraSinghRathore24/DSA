import React from 'react'
import { NavLink } from 'react-router-dom'


function Card({post}) {
  return (
    <div>
         <div className='relative pointer-events-auto '>
                <img src="https://res.cloudinary.com/dixqxdivr/image/upload/v1691585289/slatebg_lkxiao.jpg" className='w-[320px] h-[280px] rounded-md' loading='lazy'/>
                    
                <div className='absolute text-white bottom-0 px-4 text-left'>
                    <p className='text-[30px] font-semibold'>{post.title}</p>
                    <p className='w-[280px]'>{post.description}</p>
                    <div className='py-10'>
                    <NavLink to={`/${post.title.replaceAll(" ", "-")}`}>
                        <button className='bg-pink-500 h-10 w-[100px] font-semibold rounded-md text-richblack-700 hover:scale-110 transition duration-300 ease-in'
                        >Explore</button>
                        </NavLink>
                    </div>
                </div>
            </div>  
    </div>
  )
}

export default Card