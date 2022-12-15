import { Grid } from "@mui/material"
import { HeaderBar } from "../Components/layouts/HeaderBar"
import { NavBar } from "../Components/layouts/NavBar"
import { PaymentContent } from "../Components/payments/PaymentContent"

export const PaymentRecord = () => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item md={2} >
                <NavBar />
            </Grid>
            <Grid item md={10} >
                <HeaderBar />
                <PaymentContent />
            </Grid>
        </Grid>
    )
}