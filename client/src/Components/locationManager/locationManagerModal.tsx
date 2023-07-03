import { Modal, Box, Typography, InputLabel, MenuItem, TextField, Button, styled, Select } from '@mui/material'
import { useState } from 'react';
import { store } from "../../utils/fireBase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import setImage from '../../images/SetImage.png'
import { addManagerLocation } from '../../redux/apiReq/locationReq';
import { RootState, useAppDispatch } from '../../redux/store';
import { setCloseLocationModal, setShowToast } from '../../redux/slice/locationSlice';
import { useSelector } from 'react-redux';

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

export const LocationManagerModal = () => {
    const dispatch = useAppDispatch()
    const { showModal } = useSelector((state: RootState) => state.locationReducer)
    const [newLocationManager, setNewLocationManager] = useState({
        _id: '',
        addressId: "9256821912",
        address: '',
        imageUrl: '',
        location: 'Sydney',
        status: true
    })

    const submitLocationManagerForm = async (event: any) => {
        event.preventDefault();
        await dispatch(addManagerLocation(newLocationManager))
        setNewLocationManager({
            _id: '',
            addressId: "9256821912",
            address: '',
            imageUrl: '',
            location: 'Sydney',
            status: true
        })
        dispatch(setCloseLocationModal())
        dispatch(setShowToast())
    }

    const { addressId, address, imageUrl, location, status } = newLocationManager

    const onChangeNewLocationManagerForm = (event: any) => setNewLocationManager({ ...newLocationManager, [event.target.name]: event.target.value })

    const onChangeImage = async (event: any) => {
        try {
            let file = event.target.files[0];
            let fileRef = ref(store, file.name);

            // Upload the file to Firebase Storage
            await uploadBytes(fileRef, file);

            // Get the download URL
            const url = await getDownloadURL(fileRef);

            // Update the image URL in the state
            setNewLocationManager({ ...newLocationManager, imageUrl: url });

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
                onClose={() => dispatch(setCloseLocationModal())}
            >
                <Box component="form" onSubmit={submitLocationManagerForm}>

                    <Box sx={{ ...style }}>
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            component="h2"
                            sx={{ fontWeight: 600 }}
                        >
                            Add new location
                        </Typography>
                        <Box>
                            <Typography sx={{ fontSize: "18px", fontWeight: 500, mt: "12px" }}>
                                Location Information
                            </Typography>
                            <InputLabel>Location</InputLabel>
                            <StyleSelect sx={{ width: "100%", }} name='location' value={location || "Sydney"} onChange={onChangeNewLocationManagerForm}>
                                <MenuItem value={'Sydney'}>Sydney</MenuItem>
                            </StyleSelect>
                            <InputLabel sx={{ mt: "12px" }}>Address</InputLabel>
                            <StyleInput type="text" required name='address' value={address} onChange={onChangeNewLocationManagerForm} />
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
                                            <img src={setImage} style={{ width: '163px', height: '178px', marginTop: "12px", cursor: "pointer" }} alt='setlect=img' />
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
                                <Button variant="contained" sx={{ ...stylesBtn }} type="submit">Create new location</Button>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Modal>
        </>
    )
}