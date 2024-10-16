import { BrowserRouter , Route, Routes } from 'react-router-dom';
import React from 'react'
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AccommodationList from './Pages/AccomodationList'
import AccommodationDetails from './Pages/AccomodationDetails';
import Booking from './Pages/Booking';
import UserProfile from './Pages/UserProfile';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import AddAccommodation from './Pages/AddAccomodation';
import SearchResults from './Pages/SearchResults';
import Favorites from './Pages/Favorites';
import Reviews from './Pages/Reviews';
// import Notifications from './Pages/';
import PayGateWay from './Pages/PayGateWay';
import AdminRegister from './Pages/AdminRegister';
import BookAccomodation from './Pages/BookAccomodation';
import Navigation from './Components/Navigation'

function App() {
  return (
<BrowserRouter>
<Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accommodations" element={<AccommodationList />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/accommodations/new" element={<AddAccommodation />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/reviews/:id" element={<Reviews />} />
        {/* <Route path="/notifications" element={<Notifications />} /> */}
        <Route path="/pay-gateway" element={<PayGateWay />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/BookAccomodation" element={<BookAccomodation />} />
      </Routes>
    </BrowserRouter>     );
}

export default App;