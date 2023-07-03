import { Modal, Box, Typography, InputLabel, FormControl, NativeSelect, MenuItem, TextField, Button, styled, Select } from '@mui/material'
import { useState } from 'react';
import { store } from "../../utils/fireBase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import setImage from '../../images/SetImage.png'
import { addManagerPost } from '../../redux/apiReq/postReq';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { setClosePostModal, setShowToast } from '../../redux/slice/postSlice';

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

export const PostManagerModal = () => {
    const dispatch = useAppDispatch()
    const { postReducer: { showModal } }: any = useSelector((state: RootState) => state)
    console.log(showModal);
    const handleClose = () => {
        dispatch(setClosePostModal())
    }
    const [newPostManager, setNewPostManager] = useState({
        _id: '',
        postId: '9256821912',
        title: '',
        imageUrl: '',
        view: 200,
        status: true
    })

    const submitPostManagerForm = async (event: any) => {
        event.preventDefault();
        await dispatch(addManagerPost(newPostManager))
        setNewPostManager({
            _id: '',
            postId: '9256821912',
            title: '',
            imageUrl: '',
            view: 200,
            status: true
        })
        dispatch(setClosePostModal())
        dispatch(setShowToast())

    }

    const { title, imageUrl, view, status } = newPostManager
    const onChangeNewPostManagerForm = (event: any) => setNewPostManager({ ...newPostManager, [event.target.name]: event.target.value })

    const onChangeImage = async (event: any) => {
        try {
            let file = event.target.files[0];
            let fileRef = ref(store, file.name);

            // Upload the file to Firebase Storage
            await uploadBytes(fileRef, file);

            // Get the download URL
            const url = await getDownloadURL(fileRef);

            // Update the image URL in the state
            setNewPostManager({ ...newPostManager, imageUrl: url });

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
                onClose={handleClose}
            >
                <Box component="form" onSubmit={submitPostManagerForm}>
                    <Box sx={{ ...style }}>
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            component="h2"
                            sx={{ fontWeight: 600 }}
                        >
                            Add new post
                        </Typography>
                        <Box>
                            <Typography sx={{ fontSize: "18px", fontWeight: 500, mt: "12px" }}>
                                Post Information
                            </Typography>
                            <InputLabel>Title</InputLabel>
                            <StyleInput type="text" required name='title' value={title} onChange={onChangeNewPostManagerForm} />
                            <InputLabel sx={{ mt: "12px" }}>Raising</InputLabel>
                            <Box sx={{ display: "flex" }}>
                                <StyleInput type='number' sx={{ width: "88%", marginRight: "8px" }}></StyleInput>
                                <FormControl>
                                    <NativeSelect variant="standard">
                                        <option>USD</option>
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ width: "50%", marginRight: "8px" }}>
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
                                            <img src={setImage} style={{ width: '163px', height: '178px', marginTop: "12px", cursor: "pointer" }} alt='set' />
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