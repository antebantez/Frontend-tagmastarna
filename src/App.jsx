import React from "react"
import HomePage from './pages/HomePage';
import SearchJourney from './pages/SearchJourney'
import SelectSeats from './pages/SelectSeats'
import TicketPage from './pages/TicketPage'
import Booking from "./pages/Booking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../scss/App.scss';



function App() {
  return (
    <BrowserRouter>
      {/* We can add components before and after <routes /> */}
      {/* They are shown for all pages */}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/searchJourney" element={<SearchJourney />} />
          <Route path="/selectSeats" element={<SelectSeats />} />
          <Route path="/ticketPage" element={<TicketPage />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;
