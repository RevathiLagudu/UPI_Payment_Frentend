import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const UserBankAccounts = () => {
  const location = useLocation();
  const userId = location.state?.userId || localStorage.getItem('userId');

  // Log the userId to verify
  console.log('Retrieved userId:', userId);

  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setError('User ID is missing.');
      setLoading(false);
      return;
    }

    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/banks/accounts/${userId}`);
        setAccounts(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch bank accounts.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Bank Accounts for User ID: {userId}</h2>
      <ul>
        {accounts.length === 0 ? (
          <p>No bank accounts found.</p>
        ) : (
          accounts.map(account => (
            <li key={account.accountNumber}>
              <p>Bank Name: {account.bankName}</p>
              <p>Account Number: {account.accountNumber}</p>
              <p>Transaction Limit: {account.transactionLimit}</p>
              <p>Amount: {account.amount}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserBankAccounts;
