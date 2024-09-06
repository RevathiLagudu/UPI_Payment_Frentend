// src/components/BankSelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateAccount = () => {
  // State to store the list of banks and selected bank
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [formData, setFormData] = useState({
    accountNumber: '',
    transactionLimit: '',
    balance: '100000.0', // Set default balance
    upiPin: '',
    userId: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    // Fetch bank list from API (or use a static list)
    const fetchBanks = async () => {
      try {
        // Example static list, replace with API call if needed
        const staticBanks = [
          { id: 1, name: 'HDFC bank' },
          { id: 2, name: 'ICIC Bank ' },
          { id: 3, name: 'SBI Bank ' },
          { id: 4, name: 'APGVB Bank' },
          { id: 5, name: 'Indus Bank' },
        ];
        setBanks(staticBanks);

        // For API call, use:
        // const response = await axios.get('https://api.example.com/banks');
        // setBanks(response.data);
      } catch (error) {
        console.error('Error fetching bank list:', error);
      }
    };

    fetchBanks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedBank) newErrors.bank = 'Bank selection is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!formData.transactionLimit || isNaN(formData.transactionLimit)) newErrors.transactionLimit = 'Valid transaction limit is required';
    if (!formData.balance || isNaN(formData.balance)) newErrors.balance = 'Valid balance is required';
    if (!formData.upiPin || formData.upiPin.length !== 4 || isNaN(formData.upiPin)) newErrors.upiPin = 'UPI PIN must be exactly 4 digits';
    if (!formData.userId || isNaN(formData.userId)) newErrors.userId = 'Valid user ID is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await axios.post('http://localhost:9090/bank/like', {
        bank: selectedBank,
        ...formData,
      });
      console.log('Account created successfully:', response.data);
      // Handle successful account creation (e.g., redirect, show a success message)
    } catch (error) {
      console.error('Error creating account:', error);
      setSubmitError('An error occurred while creating the account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-account-container">
      <h1>Create Bank Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bank">Select Bank:</label>
          <select
            id="bank"
            name="bank"
            value={selectedBank}
            onChange={handleBankChange}
          >
            <option value="">Select a bank Name</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
          {errors.bank && <p className="error">{errors.bank}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
          />
          {errors.accountNumber && <p className="error">{errors.accountNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="transactionLimit">Transaction Limit:</label>
          <input
            type="number"
            id="transactionLimit"
            name="transactionLimit"
            value={formData.transactionLimit}
            onChange={handleChange}
          />
          {errors.transactionLimit && <p className="error">{errors.transactionLimit}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="balance">Balance:</label>
          <input
            type="number"
            id="balance"
            name="balance"
            value={formData.balance}
            readOnly // Prevent user from changing the balance
          />
          {errors.balance && <p className="error">{errors.balance}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="upiPin">UPI PIN:</label>
          <input
            type="text"
            id="upiPin"
            name="upiPin"
            value={formData.upiPin}
            onChange={handleChange}
          />
          {errors.upiPin && <p className="error">{errors.upiPin}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
          {errors.userId && <p className="error">{errors.userId}</p>}
        </div>

        {submitError && <p className="error">{submitError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
