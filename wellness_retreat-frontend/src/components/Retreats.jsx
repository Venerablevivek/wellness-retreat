import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../BASE_URL';
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { IoLocation } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { Link } from 'react-router-dom';

function ShortenedParagraph({ paragraph }) {
    if (!paragraph) return null;
    const words = paragraph.split(' ');
    // Take only the first 20 words and join them back into a string
    const shortenedText = words.slice(0, 15).join(' ');
  
    return (
      <p>{shortenedText}</p>
    );
  }

  function ShortenedBio({ paragraph }) {
    if (!paragraph) return null;
    const words = paragraph.split(' ');
    // Take only the first 20 words and join them back into a string
    const shortenedText = words.slice(0, 5).join(' ');
  
    return (
      <p>{shortenedText}</p>
    );
  }

const Retreats = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
  const [retreatsData, setRetreatsData] = useState();

  const handleSearch = () =>{
    setQuery(query.trim());
  }

useEffect(()=>{
    getData();
},[])

const getData = async() =>{
    setLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}/retreats/get-all`);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        setRetreatsData(response.data.data);
        setLoading(false);
    } catch (error) {
        console.log("error", error);
        setLoading(false);
    }
}

  const filteredData = retreatsData?.filter((item) =>
    Object.values(item)
      .join("")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className=' w-11/12 mx-auto flex flex-col gap-2 mb-10 ' >
            
            <h3 className=' md:w-9/12 mx-auto text-2xl mb-2 md:mb-0 md:text-xl font-inter font-semibold mt-5 font-body ' >Retreats</h3>

            <div className=' md:w-9/12 mx-auto flex flex-col md:flex-row gap-2 justify-between items-center ' >
                <div className='w-full mx-auto bg-white rounded-md flex items-center justify-between relative ' >
                    <input 
                    type='search'
                    className='py-2 px-6 bg-transparent rounded-[10px] text-gray-800 w-full focus:outline-none cursor-pointer rounded-t-md rounded-b-md
                     border-gray-400 border-2 '
                    placeholder='Search a Keyword (eg. Category, Name, Tags, etc. ) ' 
                    value={query}
                    onChange={(e)=> setQuery(e.target.value)}
                    />
                </div>
                <button className='bg-gray-800 mr-4 font-semibold text-white px-6 py-2 rounded-lg
                hover:bg-gray-600 transition-all duration-300' onClick={handleSearch} >Search</button>
            </div>

            {
                loading && (
                    <div className=' flex items-center justify-center mt-[100px] ' >
                        <Loader/>
                    </div>
                )
            }

            {
                !loading && (
                    <div className=' w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[80px] gap-8 ' >
                {
                    filteredData?.map((retreat,ind)=>(             
                            <div key={ind} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative ">
                                <p className=' absolute bg-emerald-100 text-green-500 shadow-xl rounded-full px-3 py-1 left-1 top-1  ' >{retreat?.type}</p>
                                
                                <p className=' absolute bg-red-100 text-red-500 flex items-center gap-2 shadow-xl rounded-full px-3 py-1 left-1 top-[52%]  ' ><IoLocation /> {retreat?.location}
                                </p>
                                {
                                    retreat?.id === 1 && (<p className=' absolute bg-blue-100 text-blue-500 flex items-center gap-2 shadow-xl rounded-full px-3 py-1 right-1 top-[52%]  ' ><MdAccessTimeFilled /> {retreat?.duration} days
                                    </p>)
                                }
                                {
                                    retreat?.id !== 1 && (<p className=' absolute bg-blue-100 text-blue-500 flex items-center gap-2 shadow-xl rounded-full px-3 py-1 right-1 top-[52%]  ' ><MdAccessTimeFilled /> {retreat?.duration}
                                    </p>)
                                }
                                <a href="#">
                                    <img className="rounded-t-lg w-[400px] h-[250px] object-cover " src={retreat?.image} alt="Retreat Image" loading='lazy' />
                                </a>
                                <div className=" h-[200px] p-5 flex flex-col gap-2 relative ">
                                    <a href="#">
                                        <h5 className=" mt-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{retreat?.title}</h5>
                                    </a>
                                    <p className=" font-normal text-gray-700 dark:text-gray-400">
                                    {retreat?.description}
                                        </p>
                                    <div className=' absolute bottom-5 flex justify-between items-center gap-5 ' >
                                        <Link to={`/book-retreat/${retreat?.id}`} >
                                            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Book Now
                                            </button>
                                        </Link>
                                        <p className=' text-xl font-semibold ' >Rs. {retreat?.price} <span className='text-[12px] font-light line-through ' > Rs. ({ Number(retreat?.price)+350}) </span> <span className=' text-red-500 text-sm font-light ' >(60% OFF)</span> </p>
                                    </div>
                                </div>
                            </div>
                    ))
                }
            </div>
                )
            }

            {/* <Pagination
        retreatsPerPage={retreatsPerPage}
        totalRetreats={filteredData?.length}
        paginate={paginate}
        currentPage={currentPage}
      /> */}

    </div>
  )
}

export default Retreats