import { LoginForm } from "../Components/auth/LoginForm";
import { RegisterForm } from "../Components/auth/RegisterForm";
import ImageLogin from "../../src/images/LoginImage.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { Avatar, CircularProgress, Typography } from "@mui/material";
import LoginIcon from "../images/LoginIcon.png";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadUser } from "../redux/apiReq/authReq";
import { RootState, useAppDispatch } from "../redux/store";
import { logOut } from "../redux/slice/authSlice";

const Auth = ({ authRoute }: { authRoute: any }) => {
    const dispatch = useAppDispatch();

    const {
        authReducer: { authLoading, isAuthenticated, isLogout },
    }: any = useSelector((state: RootState) => state);
    // console.log("check log out", isLogout);

    useEffect(() => {
        if (isLogout) {
            dispatch(logOut());
        } else {
            dispatch(loadUser());
        }
    }, []);
    // console.log(isAuthenticated);

    let body;
    if (authLoading) {
        body = (
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    else if (isAuthenticated && localStorage.length === 1) return <Navigate to="/home" />;
    else
        body = (
            <>
                {authRoute === "login" && <LoginForm />}
                {authRoute === "register" && <RegisterForm />}
            </>
        );
    return (
        <Grid container sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={8}
                sx={{
                    backgroundImage: `url(${ImageLogin})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></Grid>
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography sx={{ color: "#2BA84A", fontSize: 32, fontWeight: 700 }}>
                        Welcome to Startnow
                    </Typography>
                    <Avatar src={LoginIcon} sx={{ width: 150, height: 150 }} />
                    {body}
                </Box>
            </Grid>
        </Grid>
    );
};

export { Auth };
