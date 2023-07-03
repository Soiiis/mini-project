import Box from '@mui/material/Box'
import { Button, Grid, InputLabel, Link, TextField, Typography } from "@mui/material";
import { useState } from "react"
import { AlertMessage } from '../layouts/AlertMessage'
import { loginUser } from "../../redux/apiReq/authReq"
import { useAppDispatch } from '../../redux/store';
const styles = {
  backgroundColor: '#2BA84A',
  '&:hover': {
    backgroundColor: '#2BA84A',
  }
}
const LoginForm = () => {
  const dispatch = useAppDispatch()
  //Context
  // const { loginUser }: any = useContext(AuthContext);


  // Local State
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })


  //
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);
  const [alert, setAlert] = useState<any>(null)

  const { username, password } = loginForm
  const onChangeUserLoginForm = (event: any) => setLoginForm({ ...loginForm, username: event.target.value })
  const onChangePasswordLoginForm = (event: any) => setLoginForm({ ...loginForm, password: event.target.value })
  const login = async (event: any) => {
    event.preventDefault();
    try {
      const loginData = await dispatch(loginUser(loginForm))
      // const loginData = await loginUser(loginForm)
      if (!loginData.payload.success) {
        setAlert({ type: 'error', message: loginData.payload.message });
        setTimeout(() => setAlert(null), 5000)
      }
    }
    catch (error) {
      console.log(error);

    }

  }
  return (
    <>
      <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={login} >
        <AlertMessage info={alert} />
        <InputLabel sx={{ fontWeight: 700 }}>Username</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          id="user"
          label=""
          name="username"
          autoComplete="user"
          autoFocus
          value={username}
          onChange={onChangeUserLoginForm}
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
          onChange={onChangePasswordLoginForm}
        />
        <Button

          type="submit"
          fullWidth
          variant="contained"
          sx={{
            ...styles, mt: 3, mb: 2,

          }}
        >
          Sign In
        </Button>
        <Grid container>

          <Link href="/register" variant="body2" underline="none" sx={{ mr: 1, mt: 0.5, mf: 0.5, color: '#2BA84A' }} >
            {'Click here'}
          </Link>
          <Typography > to Sign up if you don’t have an account</Typography>
        </Grid>
      </Box>
    </>

  )
};

export { LoginForm };

