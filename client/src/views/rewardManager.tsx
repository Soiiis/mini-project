import { Grid } from "@mui/material"
import { HeaderBar } from "../Components/layouts/HeaderBar"
import { NavBar } from "../Components/layouts/NavBar"
import { PostManagerContent } from "../Components/postManager/PostManagerContent"
import { RewardManagerContent } from "../Components/rewards/RewardManagerContent"

export const RewardManager = () => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item md={2} >
                <NavBar />
            </Grid>
            <Grid item md={10} >
                <HeaderBar />
                <RewardManagerContent />
            </Grid>
        </Grid>
    )
}