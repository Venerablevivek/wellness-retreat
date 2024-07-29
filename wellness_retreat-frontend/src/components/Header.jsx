import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  console.log(url);

  return (
    <header>
    <nav class=" border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" class="flex items-center">
                <span class="self-center text-xl font-semibold whitespace-nowrap uppercase text-white">Wellness Retreats</span>
            </Link>
            <div class="flex items-center lg:order-2">
                <a href="#" class="hover:text-gray-800 text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 transition-all duration-200 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                <a href="#" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <Link to="/" className={`block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent ${url === "/" ? "text-primary-700" : "text-gray-500"} lg:p-0 hover:text-white transition-all duration-200 `} aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link to="/all-bookings" 
                        className={` block py-2 pr-4 pl-3 ${url==="/all-bookings" ? "text-primary-700" : "text-gray-500 "} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 hover:text-white transition-all duration-200 lg:dark:hover:bg-transparent dark:border-gray-700 `}>All Bookings</Link>
                    </li>
                 
                </ul>
            </div>
        </div>
    </nav>
</header>
  )
}

export default Header