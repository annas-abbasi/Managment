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
import Dashboard1 from './dashboard/Dashboard1';
import Dashboard2 from './dashboard/Dashboard2';

export default function AppRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="dashboard1" element={<Dashboard1 />} />
                    <Route path="dashboard2" element={<Dashboard2 />} />
                </Route>
            </Routes>
            <Footer />
        </>
    );
}
