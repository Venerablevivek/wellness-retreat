import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../BASE_URL';
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { useParams } from 'react-router-dom';
import {formateDate} from "../utils/formateDate";
import {toast} from "react-hot-toast";

const BookRetreat = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    
  const [formData, setFormData] = useState({
    user_id:'',
    user_name:'',
    user_email:'',
    user_phone:'',
    retreat_id:'',
    retreat_title:'',
    retreat_location:'',
    retreat_price:'',
    retreat_duration:'',
    payment_details:'',
    booking_date:''
  });

  const handleInputChange = (e) => {
    setFormData({...formData,
      [e.target.name]: e.target.value
    })
  }
   
  const [instructorData, setInstructorData] = useState();
    
    useEffect(()=>{
        getData();
    },[])

const getData = async() =>{
    setLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}/retreats/get-one/${id}`);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        setInstructorData(response.data.data[0]);
        setLoading(false);
    } catch (error) {
        console.log("error", error);
        setLoading(false);
    }
}

useEffect(()=>{
    setFormData({
        retreat_id:instructorData?.id,
        retreat_title:instructorData?.title,
        retreat_location:instructorData?.location,
        retreat_price:instructorData?.price,
        retreat_duration:instructorData?.duration,
    });
  },[instructorData]);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post(`${BASE_URL}/book/book-retreat`,{
            formData
        });

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success('Retreat Booked Successfully');
        setLoading(false);
    } catch (error) {
        console.log("error", error);
        toast.error(`${error.response.data.message}`);
        setLoading(false);
    }
  }

  return (
    <div className=' w-11/12 mx-auto flex flex-col gap-4 ' >
        <h2 className=' text-center text-xl font-semibold uppercase ' >Book a Retreat</h2>

        <div className='w-full flex items-center flex-col lg:flex-row justify-between gap-[100px] ' >
            <div className=' flex flex-col ' >
                <h4 className=' text-center text-lg font-semibold uppercase mb-3 ' >Retreat Details</h4>
                <div className=' flex items-center justify-center ' >
                    <img src={instructorData?.image} className=' w-[150px] h-[150px] object-cover rounded-md mb-3 ' />
                </div>
                <div className='flex items-center gap-2' >
                    <p className=' font-semibold ' >Title:</p>
                    <p>{instructorData?.title}</p>
                </div>
                <div className='flex items-center gap-2' >
                    <p className=' font-semibold ' >Description:</p>
                    <p>{instructorData?.description}</p>
                </div>
                <div className='flex items-center gap-2' >
                    <p className=' font-semibold ' >Location:</p>
                    <p>{instructorData?.location}</p>
                </div>
                <div className='flex items-center gap-2' >
                    <p className=' font-semibold ' >Price:</p>
                    <p>Rs. {instructorData?.price}</p>
                </div>
                <div className='flex items-center gap-2' >
                    <p className=' font-semibold ' >Duration:</p>
                    <p>{instructorData?.duration}</p>
                </div>
                <div className='flex items-center gap-2' >
                    <p className=' font-semibold ' >Type:</p>
                    <p>{instructorData?.type}</p>
                </div>
                <div className='flex items-center gap-2' >
                    <p className=' font-semibold ' >Date:</p>
                    <p>{formateDate(instructorData?.date)}</p>
                </div>
            </div>

            <div className=' w-[100%] lg:w-[40%] flex flex-col gap-3 items-center justify-center bg-white rounded-md px-5 py-8 ' >
                <h4 className=' text-center text-lg font-semibold uppercase mb-3 ' >Complete Booking</h4>
                <form className=' w-full flex flex-col gap-5 ' >
                        <div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-3 ' >
                                <div className=' flex flex-col gap-2' >
                                <label for='user_id' className=' font-semibold' >User Id</label>
                                <input type="text" name="user_id" id="user_id" className="text-sm rounded-md p-2 bg-gray-800 placeholder-gray-400 text-white border-none outline-none " placeholder="Enter your Id (eg. 1,2...)" value={formData.user_id} onChange={handleInputChange} required />
                            </div>
                            <div className='  flex flex-col gap-2' >
                            <label for='user_email' className=' font-semibold' >User Email</label>
                                <input type="email" name="user_email" id="user_email" className="text-sm rounded-md p-2 bg-gray-800 placeholder-gray-400 text-white border-none outline-none " placeholder="Enter your Email" value={formData.user_email} onChange={handleInputChange} required />
                            </div>
                            <div className='  flex flex-col gap-2 ' >
                            <label for='user_name' className=' font-semibold' >User Name</label>
                                <input type="text" name="user_name" id="user_name" className="text-sm rounded-md p-2 bg-gray-800 placeholder-gray-400 text-white border-none outline-none " placeholder="Enter your Name" value={formData.user_name} onChange={handleInputChange} required />
                            </div>
                            <div className='  flex flex-col gap-2' >
                            <label for='user_phone' className=' font-semibold' >Phone Number</label>
                                <input type="text" name="user_phone" id="user_phone" className="text-sm rounded-md p-2 bg-gray-800 placeholder-gray-400 text-white border-none outline-none " placeholder="Enter your Phone" value={formData.user_phone} onChange={handleInputChange} required />
                            </div>
                            <div className=' flex flex-col gap-2 ' >
                                <label for='booking_date' className=' font-semibold' >Date</label>
                                <input type="date" name="booking_date" id="booking_date" className="text-sm rounded-md p-2 bg-gray-800 placeholder-gray-400 text-white border-none outline-none " placeholder="Booking Date" value={formData.booking_date} onChange={handleInputChange} required />
                            </div>
                            <div className='flex flex-col gap-2 ' >
                                    <label for='payment_details' className=' font-semibold' >Payment Details</label>
                                    <select
                                    name='payment_details'
                                    value={formData.payment_details} onChange={handleInputChange}
                                    className=' text-sm rounded-md p-2 bg-gray-800 placeholder-gray-400 text-white border-none outline-none '
                                    >
                                    <option value='' >Select</option>
                                    <option value='paid' >Paid</option>
                                    <option value='notPaid' >Not Paid</option>
                                    <option value='future' >Pay in Future</option>
                                    </select>
                            </div>
                        </div>

                        <div className=' flex items-center justify-center ' >
                            <button onClick={handleSubmit} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    Book Now</button>
                        </div>
                </form>
            </div>

        </div>

    </div>
  )
}

export default BookRetreat