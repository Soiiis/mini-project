import { NavBar } from '../Components/layouts/NavBar'
import { HeaderBar } from '../Components/layouts/HeaderBar'
import { Grid } from '@mui/material'
import { WelcomeMessage } from '../Components/layouts/WelcomeMessage'
import { Content } from '../Components/layouts/Content'
export const DashBoard = () => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item md={2} >
                <NavBar />
            </Grid>
            <Grid item md={10} >
                <HeaderBar />
                <WelcomeMessage />
                <Content />
            </Grid>
        </Grid>
    )
}