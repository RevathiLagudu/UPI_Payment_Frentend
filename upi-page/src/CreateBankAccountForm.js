import React, { useState } from 'react';
import axios from 'axios';

const CreateBankAccountForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    bankName: '',
    accountNumber: '',
    transactionLimit: '',
    amount: '100000.0',  // Default amount
    upiPin: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate UPI Pin
    if (!/^\d{4}$/.test(formData.upiPin)) {
      setError('UPI Pin must be exactly 4 digits.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/banks/link', formData);
      setSuccess('Bank account created successfully!');
      setError('');
    } catch (err) {
      setError('Failed to create bank account.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Create Bank Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bank Name:</label>
          <select
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
          >
            <option value="">Select a bank</option>
            <option value="SBI">SBI</option>
            <option value="ICIC">ICIC</option>
            <option value="APGVB">APGVB</option>
            {/* Add more bank options as needed */}
          </select>
        </div>
        <div>
          <label>Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Transaction Limit:</label>
          <input
            type="number"
            name="transactionLimit"
            step="0.01"
            value={formData.transactionLimit}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>UPI Pin:</label>
          <input
            type="text"
            name="upiPin"
            value={formData.upiPin}
            onChange={handleChange}
            maxLength="4"  // Restrict input length to 4 characters
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CreateBankAccountForm;
