import { Box, Typography, Modal, Button } from '@mui/material'
import { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageSucess from '../../images/SucessImage.png'
import { setClosePostModal, setCloseToast } from '../../redux/slice/postSlice';
import { RootState, useAppDispatch } from '../../redux/store';

//style modal
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 645,
    height: 465,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

//Style Button
const stylesBtn = {
    backgroundColor: "#2BA84A",
    width: "100%",
    mt: "24px",
    color: '#FCFCFD',
    "&:hover": {
        backgroundColor: "#2BA84A",
    },
};

export const ToastPostSuccess = () => {
    const { showToast } = useSelector((state: RootState) => state.postReducer)
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(setCloseToast())
    }
    return (
        <>
            <Modal
                open={showToast}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Box>
                        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 700, color: '#2BA84A' }}>
                            Create successfully
                        </Typography>
                        <Typography sx={{ mt: 2, textAlign: 'center', fontSize: '16px' }}>
                            Your post created successfully.
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <img src={ImageSucess} style={{ width: "240px", height: "186px", marginTop: "36px", verticalAlign: "middle" }} />
                        </Box>
                    </Box>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/post-manager' >
                        <Button onClick={handleClose} sx={{ ...stylesBtn }}>Back to post management </Button>
                    </Link>
                </Box>

            </Modal>
        </>
    )
}