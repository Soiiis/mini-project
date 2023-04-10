import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { AuthState } from '../../redux/slice/authSlice';
import { RootState } from '../../redux/store';


export const ProtectedRoute = ({ component: Component, children }: any) => {
  const { authReducer: { authLoading, isAuthenticated } }: any = useSelector((state: RootState) => state);
  if (authLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }
  else if (isAuthenticated && localStorage.length == 1) {
    return children
  }
  return (
    <Navigate to='/login' />
  )
}