import { Modal, Box, Typography, InputLabel, FormControl, NativeSelect, MenuItem, TextField, Button, styled, Select } from '@mui/material'
import { useState } from 'react';
import { store } from "../../utils/fireBase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import setImage from '../../images/SetImage.png'
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { addPayment } from '../../redux/apiReq/paymentReq';
import { setClosePaymentModal, setShowToast } from '../../redux/slice/paymentSlice';

//Style Modal
const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 645,
    height: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    paddingBottom: "16px",
    borderBottom: "1px dashed #B1B5C4",
};
//Style Button
const stylesBtn = {
    backgroundColor: "#2BA84A",
    width: "100%",
    mt: "24px",
    "&:hover": {
        backgroundColor: "#2BA84A",
    },
};
//Styled input fied
const StyleInput = styled(TextField)({
    width: "100%",
    marginTop: "4px",
    "& .MuiInputBase-input": {
        padding: "4px",
        border: '1px solid #EBEAED'
    },

});
// styled select fied
const StyleSelect = styled(Select)({
    "& .MuiSelect-select": {
        padding: "4px",
    },
});

export const PaymentRecordModal = () => {

    const dispatch = useAppDispatch()
    const { showModal } = useSelector((state: RootState) => state.paymentReducer)
    const [newPayment, setNewPayment] = useState({
        _id: '',
        logId: "9256821912",
        title: 'By food for kids',
        imageUrl: '',
        moneyUsed: '300',
        status: true
    })
    // image state
    const submitPaymentForm = async (event: any) => {
        event.preventDefault();
        const postData = await dispatch(addPayment(newPayment))
        setNewPayment({
            _id: '',
            logId: "9256821912",
            title: 'By food for kids',
            imageUrl: '',
            moneyUsed: '300',
            status: true
        })
        dispatch(setClosePaymentModal())
        dispatch(setShowToast())

    }

    const { logId, title, imageUrl, moneyUsed, status } = newPayment

    const onChangeNewLocationManagerForm = (event: any) => setNewPayment({ ...newPayment, [event.target.name]: event.target.value })

    const onChangeImage = async (event: any) => {
        try {
            let file = event.target.files[0];
            let fileRef = ref(store, file.name);

            // Upload the file to Firebase Storage
            await uploadBytes(fileRef, file);

            // Get the download URL
            const url = await getDownloadURL(fileRef);

            // Update the image URL in the state
            setNewPayment({ ...newPayment, imageUrl: url });

            console.log('Uploaded successfully');
            console.log(url);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <Modal
                open={showModal}
                onClose={() => dispatch(setClosePaymentModal())}
            >
                <Box component="form" onSubmit={submitPaymentForm}>
                    <Box sx={{ ...style }}>
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            component="h2"
                            sx={{ fontWeight: 600 }}
                        >
                            Add new payment record
                        </Typography>
                        <Box>
                            <Typography sx={{ fontSize: "18px", fontWeight: 500, mt: "12px" }}>
                                Payment record information
                            </Typography>
                            <InputLabel>Title</InputLabel>
                            <StyleInput sx={{ width: "100%", }} name='title' value={title || 'By food for kids'} onChange={onChangeNewLocationManagerForm} />
                            <InputLabel sx={{ mt: "12px" }}>Money Used</InputLabel>
                            <Box sx={{ display: "flex" }}>
                                <StyleInput sx={{ width: "88%", marginRight: "12px" }} type="number" required name='moneyUsed' value={moneyUsed} onChange={onChangeNewLocationManagerForm} />
                                <FormControl>
                                    <NativeSelect variant="standard">
                                        <option>USD</option>
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ width: "50%", marginRight: "12px" }}>
                                    <InputLabel sx={{ mt: "12px" }}>Location</InputLabel>
                                    <StyleSelect sx={{ width: "100%" }} defaultValue="Sydney">
                                        <MenuItem value={'Sydney'}>Sydney</MenuItem>
                                    </StyleSelect>
                                </Box>
                                <Box sx={{ width: "50%" }}>
                                    <InputLabel sx={{ mt: "12px" }}>Address </InputLabel>
                                    <StyleSelect sx={{ width: "100%" }} defaultValue={'Crawford Room,Mortlock...'}>
                                        <MenuItem value={'Crawford Room,Mortlock...'}>
                                            Crawford Room,Mortlock...
                                        </MenuItem>
                                    </StyleSelect>
                                </Box>
                            </Box>
                            <InputLabel sx={{ mt: "12px" }}>Description</InputLabel>
                            <TextField sx={{ width: '100%', mt: "4px", }}></TextField>
                            <Box>
                                <Typography sx={{ fontSize: "18px", fontWeight: "600", mt: "12px" }} >Media</Typography>
                                <Box sx={{ display: "flex" }}>
                                    <Box>
                                        <img src={imageUrl} style={{ width: '160px', height: '178px', marginTop: "12px", marginRight: "12px", border: '1px solid #ccc' }} />
                                    </Box>
                                    <Box>
                                        <label style={{ marginTop: `20px` }} htmlFor="inputFile">
                                            <img src={setImage} style={{ width: '163px', height: '178px', marginTop: "12px", cursor: "pointer" }} />
                                        </label>
                                        <input
                                            style={{ display: "none" }}
                                            accept="image/png, image/gif, image/jpeg"
                                            id="inputFile"
                                            type="file"
                                            required
                                            onChange={onChangeImage}
                                        />

                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Button variant="contained" sx={{ ...stylesBtn }} type="submit">Create new post</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}