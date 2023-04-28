import { Grid } from "@mui/material"
import { HeaderBar } from "../Components/layouts/HeaderBar"
import { SideBar } from "../Components/layouts/SideBar"
import { LocationManagerContent } from "../Components/locationManager/LocationManagerContent"

export const LocationManager = () => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item md={2} >
                <SideBar />
            </Grid>
            <Grid item md={10} >
                <HeaderBar />
                <LocationManagerContent />
            </Grid>
        </Grid>
    )
}