import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import Footer from './Footer';
import Landing from './Landing';
import Dashboard from './Dashboard';
import { Members, Profile, Time, Assignee } from './dashboard/IndexDashboard';
import Signup from './Signup';
import Login from './Login';
import ProtectedRoute from '../ProtectedRoute'; // Import the ProtectedRoute component
import { AuthProvider } from '../AuthContext'; // Import the AuthProvider

export default function AppRoutes() {
    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route path="Assignee" element={<Assignee />} />
                    <Route path="Members" element={<Members />} />
                    <Route path="Profile" element={<Profile />} />
                    <Route path="Time" element={<Time />} />
                </Route>
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
            <Footer />
        </AuthProvider>
    );
}







// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from '../Component/Navbar';
// import Footer from './Footer';
// import Landing from './Landing';
// import Dashboard from './Dashboard';
// import { Members, Profile, Time, Assignee } from './dashboard/IndexDashboard';
// import Signup from './Signup';
// import Login from './Login';
// import ProtectedRoute from '../ProtectedRoute'; // Import the ProtectedRoute component
// import { AuthProvider } from '../AuthContext'; // Import the AuthProvider

// export default function AppRoutes() {
//     return (
//         <AuthProvider>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={<Landing />} />
//                 <Route
//                     path="/dashboard"
//                     element={
//                         <ProtectedRoute>
//                             <Dashboard />
//                         </ProtectedRoute>
//                     }
//                 >
//                     <Route path="Assignee" element={<Assignee />} />
//                     <Route path="Members" element={<Members />} />
//                     <Route path="Profile" element={<Profile />} />
//                     <Route path="Time" element={<Time />} />
//                 </Route>
//                 <Route path="/Signup" element={<Signup />} />
//                 <Route path="/Login" element={<Login />} />
//             </Routes>
//             <Footer />
//         </AuthProvider>
//     );
// }



// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from '../Component/Navbar'; // Make sure to import your Navbar
// import Footer from './Footer'; // Make sure to import your Footer
// import Landing from './Landing';
// import Dashboard from './Dashboard';
// import { Members, Profile, Time, Assignee } from './dashboard/IndexDashboard';
// import Signup from './Signup';
// import Login from './Login';

// export default function AppRoutes() {
//     return (
//         <>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={<Landing />} />
//                 <Route path="/dashboard" element={<Dashboard />}>
//                     <Route path="Assignee" element={<Assignee />} />
//                     <Route path="Members" element={<Members />} />
//                     <Route path="Profile" element={<Profile />} />
//                     <Route path="Time" element={<Time />} />
//                 </Route>
//                 <Route path="/Signup" element={<Signup />} />
//                 <Route path="/Login" element={<Login />} />
//             </Routes>
//             <Footer />
//         </>
//     );
// }
