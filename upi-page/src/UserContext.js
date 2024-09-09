import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [bankAccounts, setBankAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBankAccounts = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8080/users/${userId}/bank-accounts`);
                    setBankAccounts(response.data);
                } catch (error) {
                    console.error('Error fetching bank accounts:', error);
                }
            }
            setLoading(false);
        };

        fetchBankAccounts();
    }, [userId]);

    const login = (userId, firstName) => {
        setUserId(userId);
        setFirstName(firstName);
        localStorage.setItem('userId', userId);
        localStorage.setItem('firstName', firstName);
    };

    const logout = () => {
        setUserId(null);
        setFirstName('');
        setBankAccounts([]);
        localStorage.removeItem('userId');
        localStorage.removeItem('firstName');
    };

    return (
        <UserContext.Provider value={{ userId, firstName, bankAccounts, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};
