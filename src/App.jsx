import React from "react"
import { useState } from 'react'
import HomePage from './pages/HomePage';
import SearchJourney from './pages/SearchJourney'
import SelectSeats from './pages/SelectSeats'
import TicketPage from './pages/TicketPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../scss/App.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";



function App() {
  return (
    <BrowserRouter>
      {/* We can add components before and after <routes /> */}
      {/* They are shown for all pages */}
      
      <main className="container-fluid">
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/searchJourney" element={<SearchJourney />} />
          <Route path="/selectSeats" element={<SelectSeats />} />
          <Route path="/ticketPage" element={<TicketPage/>}/>
        </Routes>
        <Footer/>
      </main>
      
    </BrowserRouter>
  );
}

export default App;
