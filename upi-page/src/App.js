import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Ensure this path is correct
import RegistrationForm from './RegistrationForm'; // Ensure this path is correct
import CreateBankAccountForm from './CreateBankAccountForm';
import UserBankAccounts from './UserBankAccounts';
import SendMoney from './components/SendMoney';
import SetPrimaryAccount from './components/SetPrimaryAccount';
import TransactionList from './components/TransactionList';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/createBankAccount" element={<CreateBankAccountForm/>}/>
                <Route path="/userBankAccounts" element={<UserBankAccounts/>}/>
                <Route path='/sendMoney' element={<SendMoney/>}/>
                <Route path='/setPrimaryAccount' element={<SetPrimaryAccount/>}/>
                <Route path='/transactionsList' element={<TransactionList/>}/>
            </Routes>
        </Router>
    );
};

export default App;
