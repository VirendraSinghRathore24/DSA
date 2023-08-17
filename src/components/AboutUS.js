import React from 'react'

function AboutUS() {
  return (
    <div>
    <p className='p-2'><strong>Home</strong> / About</p>
    <p className='ml-10 text-3xl text-blue-400'>About Me</p>
    <div className='flex flex-wrap w-full'>
    <div className='flex flex-col ml-10 lg:w-8/12 xs:w-screen items-center font-normal p-5'>
            
            <p className='leading-9 text-[18px] align-baseline text-justify'>Welcome to Master DSA. I am <strong> Virendra Singh Rathore</strong>, working in the software industory
             since year 2012. I have decided to create this website to help the society and get best and organized content for Interview
              Preparation.</p>
        <br/>
        
        <p className='leading-9 text-[18px]'>
            Here I have added Data Structures and Algorihtms problems, where you can practice and become confident solving them. Also I have added important
             System Design, Low Level Design and Design Pattern problems.

             Thank you for visiting Master DSA website and I hope it is helpful for you.
             <br/>
             <br/>
             Rejection is the part of process. Every interview is a new learning. Keep Smiling, Keep Learning and Keep Growing.
             </p>
             <br/>
             <p className='text-[18px] font-semibold'>Virendra Singh Rathore 
             <br/>
                  <span>Software Engineer  </span></p>
       
        </div>

        <div className='px-20 py-2'>
            <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1692271166/viren1_xjirxy.png' className='w-[200px] h-[280px] rounded-md'/>
       </div>
    </div>
    </div>
  )
}

export default AboutUS