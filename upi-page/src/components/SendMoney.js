// src/components/SendMoney.js
import React, { useState } from 'react';
import { sendMoney } from '../ApiService';

function SendMoney() {
  const [accountId, setAccountId] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [amount, setAmount] = useState('');
  const [receiverMobile, setReceiverMobile] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await sendMoney(accountId, upiPin, amount, receiverMobile);
      setMessage(result.message || 'Transaction successful');
    } catch (error) {
      setMessage('Failed to send money');
    }
  };

  return (
    <div>
      <h2>Send Money</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account ID:</label>
          <input type="text" value={accountId} onChange={(e) => setAccountId(e.target.value)} />
        </div>
        <div>
          <label>UPI PIN:</label>
          <input type="password" value={upiPin} onChange={(e) => setUpiPin(e.target.value)} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label>Receiver Mobile Number:</label>
          <input type="text" value={receiverMobile} onChange={(e) => setReceiverMobile(e.target.value)} />
        </div>
        <button type="submit">Send</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SendMoney;
