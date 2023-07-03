import { Typography, Box } from '@mui/material'
import IconLocation from '../../images/LocationIcon.png'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
export const WelcomeMessage = () => {
    // const { authState: { user } }: any = useContext(AuthContext)
    const { authReducer: { user } }: any = useSelector((state: any) => state);

    const [nameUser, setNameUser] = useState('');
    useEffect(() => {
        if (user) {
            setNameUser(user.username)
        }
    }, [user])

    return (
        <Box sx={{ mt: '24px', ml: '24px' }}>
            <Typography variant="h5" >Welcome back, {nameUser || ""}</Typography>
            <Box sx={{ display: 'flex', }}>
                <img src={IconLocation} style={{ width: '18.75px', height: '23.42px', marginRight: '4px' }} alt='icon-location' />
                <Typography>South Australia(SA), 5583</Typography>
            </Box>
        </Box>
    )
}