import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Card from './Card'
import data from '../Data/data.json'

function HomePage() {
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
                <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1692254280/dsa_jnnpbc.png' className='pointer-events-auto w-full h-[380px]'/>
               
                
            </div>
        <div>
        <p className='text-md font-light py-3 px-3'><strong className='font-semibold text-richblack-700'>To Master in DSA.. Pattern based problems </strong></p>
            <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 py-5  gap-y-10 ml-8 gap-x-4'>
            {
                posts.map((post, index) => (
                    <Card key={index} post={post}/>
                ))
               } 
            </div>
        </div>
    </div>
  )
}

export default HomePage