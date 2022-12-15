import { Box, Typography, Modal, Button } from '@mui/material'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { LocationManagerContext } from '../../contexts/LocationManagerContext'
import { PaymentRecordContext } from '../../contexts/PaymentRecordContext';
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

export const ToastPaymentSuccess = () => {
    //context
    const { showToast, closeDialog }: any = useContext(PaymentRecordContext)
    return (
        <>
            <Modal
                open={showToast}
                onClose={closeDialog}
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
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/payment' >
                        <Button onClick={closeDialog} sx={{ ...stylesBtn }}>Back to payment record </Button>
                    </Link>
                </Box>
            </Modal>
        </>
    )
}