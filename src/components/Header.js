import React from 'react'
import {Link} from "react-router-dom"

function Header() {

    return (
         <div className="flex top-0 justify-between items-center mx-auto w-full  h-20 px-5
         bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">
  
             <Link to="/">
                  {/* <img src="" alt="Logo" width={160} loading='lazy' className="" /> */}
                  <p className="text-white text-xl">Master DSA</p>
             </Link>
  
              <nav>
                <ul className="flex gap-x-6">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/aboutus">About us</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </ul>
              </nav>
         </div>     
    )
  }

export default Header