import { Typography, Avatar, Box, TextField, Button, Grid, Link, InputLabel } from "@mui/material";
import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AlertMessage } from '../layouts/AlertMessage'
import { registerUser } from "../../redux/apiReq/authReq"
import { useAppDispatch } from "../../redux/store";

const styles = {
  backgroundColor: '#2BA84A',
  '&:hover': {
    backgroundColor: '#2BA84A',
  }
}

const RegisterForm = () => {
  const dispatch = useAppDispatch()

  //Context
  // const { registerUser }: any = useContext(AuthContext);
  //Router
  const navigate = useNavigate();
  // Local State
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''

  })

  //
  const [alert, setAlert] = useState<any>(null)

  const { username, password, confirmPassword } = registerForm
  const onChangeUserRegisterForm = (event: any) => setRegisterForm({ ...registerForm, username: event.target.value })
  const onChangePasswordRegisterForm = (event: any) => setRegisterForm({ ...registerForm, password: event.target.value })
  const onChangeConfirmPasswordRegisterForm = (event: any) => setRegisterForm({ ...registerForm, confirmPassword: event.target.value })

  const register = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: 'warning', message: 'Password do not match' })
      setTimeout(() => setAlert(null), 5000)
      return
    }

    try {
      const registerData = await dispatch(registerUser(registerForm))

      // const registerData = await registerUser(registerForm)
      if (!registerData.payload.success) {
        setAlert({ type: 'error', message: registerData.payload.message })
        setTimeout(() => setAlert(null), 5000)
      }
    }
    catch (error) {
      console.log(error);

    }

  }
  return (
    <>

      <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={register}>
        <AlertMessage info={alert} />
        <InputLabel sx={{ fontWeight: 700 }}>Username</InputLabel>

        <TextField
          margin="normal"
          required
          fullWidth
          id="user"
          name="username"
          autoComplete="user"
          autoFocus
          value={username}
          onChange={onChangeUserRegisterForm}
        />
        <InputLabel sx={{ fontWeight: 700 }}>Password</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={onChangePasswordRegisterForm}
        />
        <InputLabel sx={{ fontWeight: 700 }}>Confirm Password</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          type="password"
          id="Confirm Password"
          value={confirmPassword}
          onChange={onChangeConfirmPasswordRegisterForm}
        />
        <Button

          type="submit"
          fullWidth
          variant="contained"
          sx={{
            ...styles, mt: 3, mb: 2,

          }}
        >
          Sign Up
        </Button>
        <Grid container>

          <Link href="/login" variant="body2" underline="none" sx={{ mr: 1, mt: 0.5, mf: 0.5, color: '#2BA84A' }} >
            {'Click here'}
          </Link>
          <Typography > to Sign in if you have an account</Typography>
        </Grid>
      </Box>
    </>
  )
};

export { RegisterForm };