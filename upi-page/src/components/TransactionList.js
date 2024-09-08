// src/components/TransactionList.js

import React, { useState, useEffect } from 'react';
import { getTransactionsByAccountId } from '../Api_Service';

function TransactionList() {
    const [accountId, setAccountId] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (accountId) {
            fetchTransactions(accountId);
        }
    }, [accountId]);

    const fetchTransactions = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const result = await getTransactionsByAccountId(id);
            setTransactions(result.transactions);
            setMessage(result.message);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchTransactions(accountId);
    };

    return (
        <div>
            <h2>Transaction List</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Account ID:</label>
                    <input
                        type="text"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                    />
                </div>
                <button type="submit">Fetch Transactions</button>
            </form>
            
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p>{message}</p>}
            
            {transactions.length > 0 && (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <p>Date: {transaction.date}</p>
                            <p>Amount: {transaction.amount}</p>
                            <p>Recipient: {transaction.recipient}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TransactionList;
