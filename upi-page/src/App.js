import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';  // Ensure this path is correct
import Home from './Home';
import Login from './Login';
import CreateBankAccountForm from './CreateBankAccountForm';
import SendMoney from './SendMoney';
import AccountDetails from'./AccountDetails';
// import BankAccountList from './BankAccountList';
import UserBank from './UserBank';



const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-bank-account" element={<CreateBankAccountForm />} />
                    <Route path="/sendMoney" element={<SendMoney/>}/>
                    <Route path='/accountDetails'element={<AccountDetails/>}/>
                    {/* <Route path='/BankAccounts' element={<User/>}/> */}
                    {/* <Route path="/BankAccountList" element={<BankAccountList/>}/> */}
                    <Route path='/user-bank' element={<UserBank/>}/>
                
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
