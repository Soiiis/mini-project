import { Grid } from "@mui/material"
import { HeaderBar } from "../Components/layouts/HeaderBar"
import { SideBar } from "../Components/layouts/SideBar"
import { PaymentContent } from "../Components/payments/PaymentContent"

export const PaymentRecord = () => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item md={2} >
                <SideBar />
            </Grid>
            <Grid item md={10} >
                <HeaderBar />
                <PaymentContent />
            </Grid>
        </Grid>
    )
}