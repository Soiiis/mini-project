import { Box, Button, Modal, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { setCloseDetails } from "../../redux/slice/locationSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import { Link } from 'react-router-dom';
import ImageSucess from '../../images/SucessImage.png'

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
export const LocationManagerDetails = () => {
    const dispatch = useAppDispatch()
    const { showDetails, addressDetails, imageUrlDetails } = useSelector((state: RootState) => state.locationReducer)
    console.log(addressDetails);
    return (
        <>
            <Modal
                open={showDetails}
                onClose={() => dispatch(setCloseDetails())}
            >
                <Box sx={style}>
                    <Box>
                        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 700, color: '#2BA84A' }}>
                            Location View Details
                        </Typography>
                        <Typography sx={{ mt: 2, textAlign: 'center', fontSize: '16px' }}>
                            {addressDetails}
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <img src={imageUrlDetails} style={{ width: "240px", height: "186px", marginTop: "36px", verticalAlign: "middle" }} />
                        </Box>
                    </Box>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/location' >
                        <Button onClick={() => dispatch(setCloseDetails())} sx={{ ...stylesBtn }}>Back to location management </Button>
                    </Link>
                </Box>
            </Modal>
        </>
    )
}
