import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import data from '../Data/simpleBinarySearch.json'

function Content() {
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

    
    <div className='pointer-events-none'>
        <div >
            <div className='flex flex-col gap-y-5 ml-10 mt-10 font-semibold'>
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

export default Content