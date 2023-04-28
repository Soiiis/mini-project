import { Grid } from "@mui/material"
import { HeaderBar } from "../Components/layouts/HeaderBar"
import { SideBar } from "../Components/layouts/SideBar"
import { RewardManagerContent } from "../Components/rewards/RewardManagerContent"

export const RewardManager = () => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item md={2} >
                <SideBar />
            </Grid>
            <Grid item md={10} >
                <HeaderBar />
                <RewardManagerContent />
            </Grid>
        </Grid>
    )
}