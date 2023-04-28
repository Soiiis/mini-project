import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing } from './Components/layouts/Landing'
import { Auth } from './views/auth'
import { DashBoard } from './views/dashBoard'
import { ProtectedRoute } from './Components/routing/protectedRoute'
import { PostManager } from './views/postManager';
import { LocationManager } from './views/locationManager';
import { PaymentRecord } from './views/paymentRecord';
import { RewardManager } from './views/rewardManager';
import { Home } from './views/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth authRoute='login' />} />
        <Route path="/register" element={<Auth authRoute='register' />} />
        <Route path='/dashboard' element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/post-manager' element={<ProtectedRoute><PostManager /></ProtectedRoute>} />
        <Route path='/location' element={<ProtectedRoute><LocationManager /></ProtectedRoute>} />
        <Route path='/reward' element={<ProtectedRoute><RewardManager /></ProtectedRoute>} />
        <Route path='/payment' element={<ProtectedRoute><PaymentRecord /></ProtectedRoute>} />
        <Route path='*' element={<Auth authRoute='login' />} />
      </Routes>
    </Router>
  );
}

export default App;


