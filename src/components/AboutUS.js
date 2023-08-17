import React from 'react'
import { Link } from 'react-router-dom'

function AboutUS() {
  return (
    <div className=''>
    <p className='p-2'><strong>Home</strong> / About</p>
    <p className='ml-10 text-3xl text-blue-400'>About Me</p>
    <div className='flex'>
        <div className='flex flex-col ml-10 p-5 w-7/12 items-center justify-evenly'>
            
            <p className='leading-10 text-md font-light'>Welcome to Master DSA. I am <strong> Virendra Singh Rathore </strong>, working in the IT Industory
             since year 2012. I have decided to create this website to help the society and get best and organized content for Interview
              Preparation.</p>
        
        
        <p className='leading-10 text-md font-light'>
            Here I have added Data Structures and Algorihtms problems, where you can practice and become confident solving them. Also I have added important
             System Design, Low Level Design and Design Pattern problems.

             Thank you for visiting Master DSA website and I hope it is helpful for you.
             <br/>
             <br/>
             Rejection is the part of process. Every interview is a new learning. Keep Smiling and Keep Learning.
             </p>
             <p className='text-left'>Virendra Singh Rathore 
             <br/>
                  Software Engineer  </p>
       
        </div>

        <div className='p-5'>
            <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1692271166/viren1_xjirxy.png' className='w-[290px] h-[350px] rounded-md'/>
       </div>
    </div>
    </div>
  )
}

export default AboutUS