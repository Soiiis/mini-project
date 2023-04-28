
import IconMenu from '../../images/IconMenu.png'
import { Link, NavLink } from 'react-router-dom'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import styled from 'styled-components'
import overview from '../../images/IconOverview.png'
import overviewShow from '../../images/IconOverviewColor.png'
import post from '../../images/IconPost.png'
import postShow from '../../images/IconPostColor.png'
import location from '../../images/IconLocation.png'
import locationShow from '../../images/IconLocationColor.png'
import reward from '../../images/IconReward.png'
import rewardShow from '../../images/IconRewardColor.png'
import payment from '../../images/IconPayment.png'
import paymentShow from '../../images/IconPaymentColor.png'
import { log } from 'console'

const S_textLeft = styled(ListItemText)({
    "& .css-10hburv-MuiTypography-root": {
        fontWeight: `700`,
    },
});
let activeStyle = {
    color: '#2BA84A',
    textDecoration: 'none',
    backgroundColor: '#D5EEDB',
    width: '100%'
};

let Style = {
    color: '#353945',
    textDecoration: 'none',
    width: '100%'
}

const S_NavLink = styled(NavLink)({
    textDecoration: "none",
    display: "block",
    width: "100%",
    height: "100%",
})




export const SideBar = () => {
    const arrayIcon = [overview, post, location, reward, payment];
    const arrayIconShow = [
        overviewShow,
        postShow,
        locationShow,
        rewardShow,
        paymentShow,
    ];
    const arrLink = ['dashboard', 'post-manager', 'location', 'reward', 'payment']
    const check = window.location.pathname

    return (
        <div className="navbar">
            <Link to='/home' >
                <div className="navbar--logo" >
                    <img src={IconMenu} className="navbar--logo__icon" />
                    <p className="navbar--logo__text">Startnow</p>
                </div>
            </Link>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 240,
                        boxSizing: "border-box",
                        marginTop: `60px`,
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar></Toolbar>
                <List >
                    {[
                        "Overview",
                        "Post manager",
                        "Location",
                        "Reward",
                        "Payment record",
                    ].map((text, index) => (
                        <ListItem key={text} disablePadding >
                            <ListItemButton sx={{ padding: '6px 0 0 6px' }}
                            >
                                <NavLink to={`/${arrLink[index]}`} style={({ isActive }) =>
                                    isActive ? activeStyle : Style
                                }>
                                    <ListItemButton sx={{ width: '100%', padding: '0' }}>
                                        <ListItemIcon>
                                            <img
                                                style={{ width: `18px`, marginRight: '18px' }}
                                                src={
                                                    check === `/${arrLink[index]}` ? arrayIconShow[index] : arrayIcon[index]

                                                }
                                            />
                                        </ListItemIcon>
                                        <S_textLeft
                                            primary={text}
                                        />

                                    </ListItemButton>
                                </NavLink>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}