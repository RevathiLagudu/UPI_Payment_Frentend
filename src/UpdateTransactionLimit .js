import React, { useState } from 'react';
import axios from 'axios';

const UpdateTransactionLimit = () => {
    const [id, setId] = useState('');
    const [transactionLimit, setTransactionLimit] = useState('');
    const [message, setMessage] = useState('');
    const [bankAccount, setBankAccount] = useState(null);

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(`http://localhost:8080/banks/${id}/transactionLimit`, {
                transactionLimit: parseFloat(transactionLimit),
            });
            if (response.data.status === 'success') {
                setBankAccount(response.data.bankAccount);
                setMessage('Transaction limit updated successfully');
            } else {
                setMessage('Bank account not found');
            }
        } catch (error) {
            setMessage('Error updating transaction limit');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter bank account ID"
            />
            <input
                type="number"
                value={transactionLimit}
                onChange={(e) => setTransactionLimit(e.target.value)}
                placeholder="Enter new transaction limit"
            />
            <button onClick={handleUpdate}>Update Transaction Limit</button>
            {bankAccount && <div>Updated Account: {JSON.stringify(bankAccount)}</div>}
            <p>{message}</p>
        </div>
    );
};

export default UpdateTransactionLimit;
