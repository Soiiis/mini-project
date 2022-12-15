import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';


export const ProtectedRoute = ({ component: Component, children }: any) => {
  const { authState: { authLoading, isAuthenticated } }: any = useContext(AuthContext)
  // const { authReducer: { authLoading, isAuthenticated } }: any = useSelector((state: any) => state);
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
  else if (isAuthenticated) {
    return children
  }
  return (
    <Navigate to='/login' />
  )
}