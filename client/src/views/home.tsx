import { SideBar } from '../Components/layouts/SideBar'
import { HeaderBar } from '../Components/layouts/HeaderBar'
import { Grid } from '@mui/material'
import { WelcomeMessage } from '../Components/layouts/WelcomeMessage'
import { HomeContent } from '../Components/home/HomeContent'
export const Home = () => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item md={2} >
                <SideBar />
            </Grid>
            <Grid item md={10} >
                <HeaderBar />
                <WelcomeMessage />
                <HomeContent />
            </Grid>
        </Grid>
    )
}