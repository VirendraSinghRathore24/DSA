import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import data from '../Data/linkedlist.json'

function LinkedListPage() {
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
        <p className='p-2 text-[16px]'><strong className='font-semibold '><NavLink to="/"> Home </NavLink><NavLink to="/Data-Structures"> / Data Structures  </NavLink></strong>  / Array</p>
            <div className='flex flex-col gap-y-2 ml-1 mt-6 font-semibold'>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                        <th scope="col" className="px-1 py-2"></th>
                        <th scope="col" className="px-1 py-2">#</th>
                        <th scope="col" className="px-1 py-2">Problem</th>
                        <th scope="col" className="px-2 py-2">Practice</th>
                        <th scope="col" className="px-6 py-2">Solution</th>
                        <th scope="col" className="px-6 py-2">Notes</th>
                        </tr>
                    </thead>
            <tbody>
            {
                    posts.map((post, index) => (
                        
                            <tr className="border-b dark:border-neutral-500">
                                <td><input type='checkbox' className='w-[25px] h-[25px]'></input></td>
                                <td className="whitespace-nowrap px-1 py-2 font-medium">{index + 1} .</td>
                                <td className="whitespace-wrap text-[16px] font-medium px-1 py-2">{post.title}</td>
                                <td className='px-2 py-2 w-[40px] h-[40px]'>
                                    <a href={post.practiceurl} target="_blank" rel="noreferrer">
                                        <img src="https://res.cloudinary.com/dixqxdivr/image/upload/v1691844715/leetcode_qjndoy.png" className='w-[40px] h-[40px] rounded-md' loading='lazy'/>
                                    </a>
                                 </td>
                                <td className='px-6 py-2 w-[40px] h-[40px]'> 
                                    <a href={post.youtubeurl} target="_blank" rel="noreferrer">
                                    <img src="https://res.cloudinary.com/dixqxdivr/image/upload/v1688707836/youtube-1837872_1280_oicf29.png" className='w-[40px] h-[40px] rounded-md' loading='lazy'/>
                                    </a>
                                </td>
                                <td className='px-6 py-2 w-[40px] h-[40px]'> 
                                   
                                    <img src="https://res.cloudinary.com/dixqxdivr/image/upload/v1692189663/notes1_apfc9m.png" className='w-[40px] h-[40px] rounded-md' loading='lazy'/>
                                    
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

export default LinkedListPage