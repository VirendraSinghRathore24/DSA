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
        <div>
            <div className='flex flex-col gap-y-5 ml-20 mt-10 font-semibold'>
            <table className='table table-striped w-100'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Problem</th>
                </tr>
            </thead>
            <tbody>
            {
                    posts.map((post, index) => (
                        
                            <tr>
                                <td>{index + 1} .</td>
                                <td>{post.title}</td>
                            </tr>
                        
                        
                    ))
               
               } 
               </tbody>
               </table>
            </div>
        </div>
    </div>
  )
}

export default Content