import React, { useEffect, useState } from 'react'
import Card from './Card'
import data from '../Data/systemdesign.json'
import { NavLink } from 'react-router-dom';

function SystemDesignMainPage() {
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
       <p className='p-2 text-[16px]'><strong className='font-semibold '><NavLink to="/"> Home </NavLink></strong>/ System Design </p>
        <div>
        <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 px-10 py-5 gap-x-10 gap-y-10'>
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

export default SystemDesignMainPage