import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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
                    const name = res.data.user
                    setUser(name.userName);
                }
            } catch (error) {
                console.log('Error fetching user', error);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};