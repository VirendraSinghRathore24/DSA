import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
        <div className='shadow-md w-full flex flex-col justify-center items-center border-2 bottom-0'>
          <div className='p-5'>
            <p className='text-2xl text-center w-full'>Join Our Community</p>
            <p className='text-xl text-center font-normal p-1'>To stay connected with Viren and receive updates on the latest post, you can connect on the following platforms</p>
              <div className='flex justify-evenly gap-x-4 py-1'>
                <Link to="https://www.instagram.com/mommygk_sanju/">
                <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1688708911/instagram-1581266_1280_fwpbeq.jpg' alt='instagram' className='w-[50px] h-[50px]'/>
                </Link>
                <Link to="https://www.youtube.com/@MommyGK">
                <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1688707836/youtube-1837872_1280_oicf29.png' alt='youtube' className='w-[40px] h-[40px] mt-2'/>
                </Link>
                <Link to="https://www.linkedin.com/in/virendra-singh-rathore/">
                <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1686808399/Viren/linkedin.png.png' alt='linkedin' className='w-[40px] h-[40px] mt-2'/>
                </Link>
              </div>
              <p className='text-center'>Copyright © 2023 Master DSA. All rights reserved.</p>
          </div>
        <div>
       
       </div>
            
        </div>
    </div>
  )
}

export default Footer