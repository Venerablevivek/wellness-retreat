import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../BASE_URL';
import Loader from './Loader/Loader';

const AllBookings = () => {
    const [loading, setLoading] = useState(false);
    const [bookingsData, setBookingData] = useState();

    
    useEffect(()=>{
        getBookings();
    },[])
    
    const getBookings = async() =>{
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/book/get-all-bookings`);
    
            if(!response.data.success){
                throw new Error(response.data.message)
            }
    
            setBookingData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log("error", error);
            setLoading(false);
        }
    }
    console.log(bookingsData);
  return (
    <div className='w-11/12 mx-auto flex flex-col gap-2 ' >

        <h2 className=' text-center text-xl font-semibold uppercase ' >All Bookings</h2>

        <div className=' w-full mx-auto flex items-center justify-center mt-5 ' >
            {
                loading && (<Loader/>)
            }
            {
                !loading && (<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                User Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User Phone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Retreat Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Retreat Title
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Retreat Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Payment Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            bookingsData?.map((booking, index)=>(
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {booking.user_id}
                                    </th>
                                    <td class="px-6 py-4">
                                    {booking.user_name}
                                    </td>
                                    <td class="px-6 py-4">
                                    {booking.user_email}
                                    </td>
                                    <td class="px-6 py-4">
                                    {booking.user_phone}
                                    </td>
                                    <td class="px-6 py-4">
                                    {booking.retreat_id}
                                    </td>
                                    <td class="px-6 py-4">
                                    {booking.retreat_title}
                                    </td>
                                    <td class="px-6 py-4">
                                    {booking.retreat_price}
                                    </td>
                                    <td class="px-6 py-4">
                                    {
                                        booking.payment_details === "notPaid" && 
                                        (<p className=' text-center rounded-full px-1 py-1 bg-red-100 text-red-500 font-semibold' >Not Paid</p>)
                                    }
                                    {
                                        booking.payment_details === "paid" && 
                                        (<p className=' text-center rounded-full px-1 py-1 bg-emerald-100 text-green-500 font-semibold ' >Paid</p>)
                                    }
                                    {
                                        booking.payment_details === "future" && 
                                        (<p className=' text-center rounded-full px-1 py-1 bg-yellow-100 text-yellow-500 font-semibold' >Pay in Future</p>)
                                    }
                                    </td>
                                  
                                </tr>
                            ))
                       }
                    </tbody>
                </table>
                        </div>)
            }
        </div>

    </div>
  )
}

export default AllBookings