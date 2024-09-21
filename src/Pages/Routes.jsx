import React from 'react';
import Login from './Login';
import Footer from './Footer';
import Signup from './Signup';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Navbar from '../Component/Navbar';
import ProtectedRoute from '../ProtectedRoute';
import { AuthProvider } from '../AuthContext';
import { Routes, Route } from 'react-router-dom';
import { Members, Profile, Time, Assignee, AccountDetails, EditProfile, ProjectReview, Chat, ViewProfile } from './dashboard/IndexDashboard';
import SubProjectReview from './dashboard/SubProjectReview';

export default function AppRoutes() {
    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/dashboard/*"
                    element={<ProtectedRoute>
                        <>
                            <Dashboard />
                            <Footer />
                        </>
                    </ProtectedRoute>
                    }>
                    <Route path="Assignee" element={<Assignee />} />
                    <Route path="Members" element={<Members />} />
                    <Route path="Profile/*" element={<Profile />} >
                        <Route path="ViewProfile" element={<ViewProfile navigate='/dashboard/Profile' />} />
                    </Route>
                    {/* UserProfile */}
                    <Route path="Time" element={<Time />} />
                    <Route path="Edit-Profile" element={<EditProfile />} />
                    <Route path="Account-Details" element={<AccountDetails />} />
                    <Route path="Chat" element={<Chat />} />
                    <Route path="ProjectReview/*" element={<ProjectReview />} >
                        <Route path="SubProjectReview/:id" element={<SubProjectReview navigate='/dashboard/ProjectReview' />} />
                    </Route>
                </Route>
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
            {/* <Footer /> */}
        </AuthProvider>
    );
}