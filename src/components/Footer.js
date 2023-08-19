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
                <a href="https://leetcode.com/Viren21/" target="_blank" rel="noreferrer">
                 <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1691844715/leetcode_qjndoy.png' alt='instagram' className='w-[50px] h-[50px]'/>
                </a>
                <Link to="https://www.youtube.com/channel/UCHW2UhCi82KdKRlpWq-4_1Q" target="_blank" rel="noreferrer">
                <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1688707836/youtube-1837872_1280_oicf29.png' alt='youtube' className='w-[40px] h-[40px] mt-2'/>
                </Link>
                <a href="https://www.linkedin.com/in/virendra-singh-rathore/" target="_blank" rel="noreferrer">
                <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1686808399/Viren/linkedin.png.png' alt='linkedin' className='w-[40px] h-[40px] mt-2'/>
                </a>
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