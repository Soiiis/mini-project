import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing } from './Components/layouts/Landing'
import { Auth } from './views/auth'
import { AutheContextProvider } from './contexts/AuthContext'
import { DashBoard } from './views/dashBoard'
import { ProtectedRoute } from './Components/routing/protectedRoute'
import { PostManagerContextProvider } from './contexts/PostManagerContext'
import { PostManager } from './views/postManager';
import { LocationManager } from './views/locationManager';
import { LocationManagerContextProvider } from './contexts/LocationManagerContext'
import { PaymentRecord } from './views/paymentRecord';
import { PaymentRecordContextProvider } from './contexts/PaymentRecordContext';
import { RewardManager } from './views/rewardManager';
import { RewardManagerContextProvider } from './contexts/RewardManagerContext';

function App() {
  return (
    <AutheContextProvider>
      <PostManagerContextProvider>
        <LocationManagerContextProvider>
          <PaymentRecordContextProvider>
            <RewardManagerContextProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Auth authRoute='login' />} />
                  <Route path="/register" element={<Auth authRoute='register' />} />
                  <Route path='/dashboard' element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
                  <Route path='/post-manager' element={<ProtectedRoute><PostManager /></ProtectedRoute>} />
                  <Route path='/location' element={<ProtectedRoute><LocationManager /></ProtectedRoute>} />
                  <Route path='/reward' element={<ProtectedRoute><RewardManager /></ProtectedRoute>} />
                  <Route path='/payment' element={<ProtectedRoute><PaymentRecord /></ProtectedRoute>} />
                </Routes>
              </Router>
            </RewardManagerContextProvider>
          </PaymentRecordContextProvider>
        </LocationManagerContextProvider>
      </PostManagerContextProvider>
    </AutheContextProvider>
  );
}

export default App;


