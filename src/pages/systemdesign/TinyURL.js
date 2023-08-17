import React from 'react'
import { NavLink } from 'react-router-dom'

function TinyURL() {
  return (
    <div >
        <p className='p-2 text-[16px]'><strong className='font-semibold '><NavLink to="/"> Home </NavLink><NavLink to="/System-Design"> / System Design  </NavLink></strong>  / Tiny URL</p>
        <div className='flex flex-wrap w-full items-center justify-center font-semibold text-xl'>Tiny URL -  URL Shortner</div>
        <div>
            <p className='ml-4'>
                <strong>Requirements: </strong>
                <br/>
                1. User should be able to create short url link for long url
                <br/>
                2. Short url should be unique
                <br/>
                3. User can pass unique name for url as well
                <br/>
                <br/>

                <strong>Capacity Estimation:</strong>
                <br/><br/>

                <strong>High Level Diagram:</strong>
                <br/><br/>

                <strong>Components Discussion:</strong>
                <br/><br/>

                <strong>DB Choice:</strong>
            </p>
        </div>
    </div>
  )
}

export default TinyURL