import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Component/Navbar'; // Make sure to import your Navbar
import Footer from './Footer'; // Make sure to import your Footer
import Landing from './Landing';
import Detailed from './Detailed';
import Analytics from './Analytics';
import About from './About';
import Growth from './Growth';
import Dashboard from './Dashboard';

export default function AppRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/detailed" element={<Detailed />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/about" element={<About />} />
                <Route path="/growth" element={<Growth />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
        </>
    );
}
