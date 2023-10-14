// Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import LoginContainer from './LoginContainer';
// import Login from './Login'; // Create a Login component
import GuestFeedBackForm from './components/guest/GuestFeedBackForm';
import LoginContainer from './LoginContainer';
import AdminLogin from './components/admin/AdminLogIn';
// import GuestFeedbackForm from './GuestFeedbackForm';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginContainer />} />
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="login" element={<AdminLogin />} />
            <Route path="guest-feedback-form" element={<GuestFeedBackForm />} />
        </Routes>
    );
}

export default AppRoutes;
