import { Typography, Box, Avatar } from '@mui/material'
import IconLocation from '../../images/LocationIcon.png'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useEffect, useState, useLayoutEffect } from 'react'
export const WelcomeMessage = () => {
    const { authState: { user } }: any = useContext(AuthContext)
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
                <img src={IconLocation} style={{ width: '18.75px', height: '23.42px', marginRight: '4px' }} />
                <Typography>South Australia(SA), 5583</Typography>
            </Box>
        </Box>
    )
}