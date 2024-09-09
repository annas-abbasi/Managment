import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Component/Spinner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('Token');
                if (token) {
                    const res = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_PATH}/profile`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                    const name = res.data.user;
                    setUser(name.userName);
                    console.log(name)
                }
            } catch (error) {
                console.log('Error fetching user', error);
            } finally {
                setLoading(false); // Stop loading once the user data is fetched
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
