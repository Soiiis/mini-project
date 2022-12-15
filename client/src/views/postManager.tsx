import { Grid } from "@mui/material"
import { HeaderBar } from "../Components/layouts/HeaderBar"
import { NavBar } from "../Components/layouts/NavBar"
import { PostManagerContent } from "../Components/postManager/PostManagerContent"

export const PostManager = () => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item md={2} >
                <NavBar />
            </Grid>
            <Grid item md={10} >
                <HeaderBar />
                <PostManagerContent />
            </Grid>
        </Grid>
    )
}