import { Modal, Box, Typography, InputLabel, FormControl, NativeSelect, MenuItem, TextField, Button, styled, Select } from '@mui/material'
import { useContext, useEffect, useState } from 'react';
import { store } from "../../utils/fireBase";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { PostManagerContext } from "../../contexts/PostManagerContext";
import { RewardManagerContext } from '../../contexts/RewardManagerContext';
import setImage from '../../images/SetImage.png'

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

export const RewardManagerModal = () => {

    //Context
    const {

        showAddRewardModal, closeDialog, addReward, setShowToast, showToast, setShowAddRewardModal, getReward
    }: any = useContext(RewardManagerContext);
    const [newRewardManager, setNewRewardManager] = useState({
        code: '9256821912',
        information: 'VOUCHER 50%',
        imageUrl: '',
        expired: '',
        status: true
    })
    // image state
    const submitRewardManagerForm = async (event: any) => {
        event.preventDefault();
        const { sucess, message } = await addReward(newRewardManager)
        setNewRewardManager({
            code: '9256821912',
            information: 'VOUCHER 50%',
            imageUrl: '',
            expired: '',
            status: true
        })
        setShowAddRewardModal(false)
        setShowToast(true)

    }

    const { code, information, imageUrl, expired, status } = newRewardManager

    const onChangeNewRewardManagerForm = (event: any) => setNewRewardManager({ ...newRewardManager, [event.target.name]: event.target.value })
    const onChangeImage = (event: any) => {
        let file = event.target.files[0];
        let fileRef = ref(store, file.name)
        uploadBytes(fileRef, file)
            .then((snapshot) => {
                console.log('Uploaded sucessfully');
            })

        setTimeout(() => {
            getDownloadURL(fileRef)
                .then((url) => {
                    // `url` is the download URL for 'images/stars.jpg'
                    // This can be downloaded directly:
                    // const xhr = new XMLHttpRequest();
                    // xhr.responseType = 'blob';
                    // xhr.onload = (event) => {
                    //     const blob = xhr.response;
                    // };
                    // xhr.open('GET', url);
                    // xhr.send();
                    // // Or inserted into an <img> element
                    // const img = document.getElementsByClassName('.image');
                    // // img.setAttribute('src', url);
                    // console.log(img);
                    console.log(url);

                    setNewRewardManager({ ...newRewardManager, imageUrl: url })
                })
                .catch((error) => {
                    console.log(error);

                });
        },)
    }


    return (
        <>
            <Modal
                open={showAddRewardModal}
                onClose={closeDialog}
            >
                <Box component="form" onSubmit={submitRewardManagerForm}>
                    <Box sx={{ ...style }}>
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            component="h2"
                            sx={{ fontWeight: 600 }}
                        >
                            Add new voucher
                        </Typography>
                        <Box>
                            <Typography sx={{ fontSize: "18px", fontWeight: 500, mt: "12px" }}>
                                Voucher Information
                            </Typography>
                            <InputLabel>Voucher name</InputLabel>
                            <StyleInput type="text" defaultValue={'Sydney'} />
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ width: "50%", marginRight: "8px" }}>
                                    <InputLabel sx={{ mt: "12px" }}>Expired Date</InputLabel>
                                    <StyleInput type="date" required name='expired' value={expired} onChange={onChangeNewRewardManagerForm} />
                                </Box>
                                <Box sx={{ width: "50%" }}>
                                    <InputLabel sx={{ mt: "12px" }}>Voucher Code</InputLabel>
                                    <StyleInput type="number" required name='code' value={code} onChange={onChangeNewRewardManagerForm} />
                                </Box>
                            </Box>
                            <InputLabel sx={{ mt: "12px" }}>Description</InputLabel>
                            <Box>
                                <TextField sx={{ width: '100%', mt: "4px", }}></TextField>
                            </Box>
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
                                <Button variant="contained" sx={{ ...stylesBtn }} type="submit">Create new voucher</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}