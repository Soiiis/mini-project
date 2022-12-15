import { Box, AppBar, Toolbar } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AvatarImage from '../../images/AvatarImage.png'
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F4F5F6',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  paddingRight: 20
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

export const HeaderBar = () => {
  const { logoutUser }: any = useContext(AuthContext)
  const logout = () => {
    logoutUser()

  }
  return (
    <Box sx={{ flexGrow: 1, border: '1px solid #F4F5F6' }}>
      <AppBar position="static" color='inherit' sx={{ boxShadow: 'none', }}>
        <Toolbar>
          <Search sx={{ paddingRight: '360px' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search a campaign"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Avatar src={AvatarImage} sx={{ right: 12, position: 'absolute' }} />
          <LogoutIcon sx={{ marginLeft: '550px', cursor: 'pointer', }} onClick={logout} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}