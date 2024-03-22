import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom'
import Home from './components/home/Home'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import Checkout from './components/bookings/Checkout'
import BookingSuccess from './components/bookings/BookingSuccess'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/edit-room/:roomId' element={<EditRoom/>} />
        <Route path='/existing-rooms' element={<ExistingRooms/>} />
        <Route path='/add-room' element={<AddRoom/>}/>
        <Route path='/book-room/:roomId' element={<Checkout/>}/>
        <Route path='/browse-all-rooms' element={<RoomListing/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/booking-success' element={<BookingSuccess/>}/>
      </Routes>
    </Router>
    <Footer/>
  </main>
</>
  )
}

export default App
