import React, { useState } from 'react';
import axios from 'axios';

const UpdateUpiPin = () => {
    const [id, setId] = useState('');
    const [upiPin, setUpiPin] = useState('');
    const [message, setMessage] = useState('');
    const [bankAccount, setBankAccount] = useState(null);

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(`http://localhost:8080/banks/${id}/upiPin`, {
                upiPin: upiPin,
            });
            if (response.data.status === 'success') {
                setBankAccount(response.data.bankAccount);
                setMessage('UPI PIN updated successfully');
            } else {
                setMessage('Bank account not found');
            }
        } catch (error) {
            setMessage('Error updating UPI PIN');
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
                type="text"
                value={upiPin}
                onChange={(e) => setUpiPin(e.target.value)}
                placeholder="Enter new UPI PIN"
            />
            <button onClick={handleUpdate}>Update UPI PIN</button>
            {bankAccount && <div>Updated Account: {JSON.stringify(bankAccount)}</div>}
            <p>{message}</p>
        </div>
    );
};

export default UpdateUpiPin;
