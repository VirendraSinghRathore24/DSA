import React, { useEffect, useState } from 'react'
import Card from './Card'
import data from '../Data/binarySearch.json'

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
        <p className='text-md font-light py-3 px-10'><strong className='font-semibold text-richblack-700'>To Master in DSA.. Pattern based problems </strong></p>
            <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 px-10 py-5 gap-x-10 gap-y-10'>
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