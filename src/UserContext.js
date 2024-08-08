import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';

export const UserContext = createContext({});
const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUserFromLocalStorage = async () => {
            const token = localStorage.getItem('Token');
            if (token) {
                try {
                    const res = await axios.get(`${serverApi}/profile`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    const { user } = res.data;
                    const named = res.data.user.userName;
                    setUser(named);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        loadUserFromLocalStorage();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};