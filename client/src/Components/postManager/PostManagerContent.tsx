import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Avatar,
    Modal,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    NativeSelect,
    styled,
    FormControl,
} from "@mui/material";
import { textAlign } from "@mui/system";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { PostManagerContext } from "../../contexts/PostManagerContext";
import ViewIcon from "../../images/viewIcon.png";
import { PostManagerModal } from "./postManagerModal";
import { ToastPostSuccess } from "./ToastPostSuccess";



//Style Button
const styles = {
    backgroundColor: "#2BA84A",
    "&:hover": {
        backgroundColor: "#2BA84A",
    },
};

export const PostManagerContent = () => {
    //Context
    const {
        postManagerState: { posts, postLoading },
        getManagerPosts, setShowToast, setShowAddPostModal
    }: any = useContext(PostManagerContext);
    //Start get all ManagerPosts
    useEffect(() => {
        getManagerPosts();
    }, []);
    console.log(posts);



    const columns = [
        { field: "_id", headerName: "POST ID", width: 120, },
        {
            field: "title",
            headerName: "TITLE",
            width: 400,
            renderCell: (params: any) => {
                return (
                    <>
                        <img

                            src={params.row.imageUrl}
                            style={{ width: "36px", height: "36px", marginRight: "16px" }}
                        />
                        {params.row.title}
                    </>
                );
            },
        },
        {
            field: "releaseDate",
            headerName: "RELEASE DATE",
            width: 300,
        },
        {
            field: "view",
            headerName: "VIEW",
            width: 150,
            renderCell: (params: any) => {
                return (
                    <>
                        <img
                            src={ViewIcon}
                            style={{ width: "16px", height: "12.46px", marginRight: "4px" }}
                        />
                        {params.row.view}
                    </>
                );
            },
        },
        {
            field: "status",
            headerName: "STATUS",
            width: 160,
            renderCell: (params: any) => {
                if (params.row.status)
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "75px",
                                height: "36px",
                                background: "#D5EEDB",
                                textAlign: "center",
                                borderRadius: "20px",
                            }}
                        >
                            <Typography sx={{ color: "#30993B" }}>Online</Typography>
                        </Box>
                    );
                else
                    return (
                        <Box
                            sx={{
                                background: "#E6E8EC",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "75px",
                                height: "36px",
                                textAlign: "center",
                                borderRadius: "20px",
                            }}
                        >
                            <Typography sx={{ color: "#777E91" }}>Online</Typography>
                        </Box>
                    );
            },
        },
    ];
    let body = null;

    if (postLoading) {
        body = (
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <CircularProgress />
            </Box>
        );
    } else if (posts.length === 0) {
        body = <Box></Box>;
    }

    return (
        <>
            {body}
            <Box sx={{ backgroundColor: "#F4F5F6" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        ml: "24px",
                        mr: "12px",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ mt: "12px" }}>
                        Post Management
                    </Typography>
                    <Button
                        onClick={setShowAddPostModal.bind(this, true)}
                        variant="contained"
                        sx={{
                            ...styles,
                            mt: "12px",
                        }}
                    >
                        + New Post
                    </Button>
                    <PostManagerModal />
                    <ToastPostSuccess />
                </Box>
                <DataGrid
                    sx={{ mr: '14px', ml: "24px", backgroundColor: ' #FFFFFF', mt: '24px' }}
                    autoHeight
                    rows={posts}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row._id}
                />
            </Box>
        </>
        // </Box>
    );
};
