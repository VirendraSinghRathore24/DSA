import React from 'react'
import { NavLink } from 'react-router-dom'

function TinyURL() {
  return (
    <div >
        <p className='p-2 text-[16px]'><strong className='font-semibold '><NavLink to="/"> Home </NavLink><NavLink to="/System-Design"> / System Design  </NavLink><NavLink to="/System-Design-Apps"> / System Design Apps </NavLink></strong>  / Tiny URL</p>
        <div className='flex flex-wrap w-full items-center justify-center font-semibold text-xl p-2'>Tiny URL -  URL Shortner</div>
        <div>
            <p className='p-10'>
                <strong>Requirements: </strong>
                <br/>
                1. User should be able to create short url link for long url
                <br/>
                2. When user clicks on short url, it should redirect to long url
                <br/>
                3. Short url should be unique
                <br/>
                4. User can choose custom url
                <br/>
                <br/>

                <strong>Capacity Estimation:</strong>
                <br/><br/>

                <strong>High Level Diagram:</strong>
                <br/><br/>

                <strong>Components Discussion:</strong>
                <p>

                </p>
                <br/><br/>

                <strong>DB Choice:</strong>
                <p>

                </p>
            </p>
        </div>
    </div>
  )
}

export default TinyURL