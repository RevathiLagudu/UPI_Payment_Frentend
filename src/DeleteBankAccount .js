import React, { useState } from 'react';
import axios from 'axios';

const DeleteBankAccount = () => {
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/banks/${id}`);
            if (response.data.status === 'success') {
                setMessage('Bank account deleted successfully');
            } else {
                setMessage('Bank account not found');
            }
        } catch (error) {
            setMessage('Error deleting bank account');
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
            <button onClick={handleDelete}>Delete Account</button>
            <p>{message}</p>
        </div>
    );
};

export default DeleteBankAccount;
