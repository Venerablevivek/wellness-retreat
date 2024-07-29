import './App.css'
import AllBookings from './components/AllBookings';
import BookRetreat from './components/BookRetreat';
import Header from './components/Header'
import Retreats from './components/Retreats'
import {Routes, Route} from "react-router-dom";

function App() {

  return (
  <div className="w-[100vw] h-[100vh] flex flex-col gap-2 bg-gray-300 overflow-x-hidden " >
     <Header/>
    <Routes>
        <Route path='/' element={<Retreats/>} />
        <Route path='/book-retreat/:id' element={<BookRetreat/>} />
        <Route path='/all-bookings' element={<AllBookings/>} />
    </Routes>
  </div>
  )
}

export default App
