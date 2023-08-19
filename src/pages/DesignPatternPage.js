import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import data from '../Data/designpattern.json'

function DesignPatternPage() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    async function fetchBlogsData(){
        setLoading(true);
        try{

            setPosts(data);
  
        }
        catch(err){
          console.log(err);
        }
        setLoading(false);
      }
      
      useEffect(() => {
        fetchBlogsData();
      },[]);


  return (

    
    <div>
        <div >
        <p className='p-2 text-[16px]'><strong className='font-semibold '><NavLink to="/"> Home </NavLink></strong> / Design Pattern</p>
            <div className='flex flex-col gap-y-5 ml-1 mt-10 font-semibold'>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                        <th scope="col" className="px-6 py-4">#</th>
                        <th scope="col" className="px-6 py-4">Problem</th>
                
                        </tr>
                    </thead>
            <tbody>
            {
                    posts.map((post, index) => (
                        
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1} .</td>
                                <td className="whitespace-wrap text-[16px] font-medium px-6 py-4">{post.title}</td>
                                <td className='px-6 py-2 w-[40px] h-[40px]'> 
                                <NavLink to={`/${post.link}`}>
                                    <img src="https://res.cloudinary.com/dixqxdivr/image/upload/v1692189663/notes1_apfc9m.png" className='w-[40px] h-[40px] rounded-md' loading='lazy'/>
                                </NavLink>
                                </td>
                            </tr>
                        
                        
                    ))
               
               } 
               </tbody>
               </table>
            </div>
            </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default DesignPatternPage