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
import { RewardManagerContext } from "../../contexts/RewardManagerContext";
import ViewIcon from "../../images/viewIcon.png";
import { RewardManagerModal } from "./rewardManagerModal";
import { ToastRewardSuccess } from "./ToastRewardSuccess";




//Style Button
const styles = {
    backgroundColor: "#2BA84A",
    "&:hover": {
        backgroundColor: "#2BA84A",
    },
};

export const RewardManagerContent = () => {
    //Context
    const {
        rewardManagerState: { rewards, rewardLoading },
        getReward, setShowToast, setShowAddRewardModal
    }: any = useContext(RewardManagerContext);
    //Start get all ManagerRewards
    useEffect(() => {
        getReward();
    }, []);
    console.log(rewards);



    const columns = [
        { field: "code", headerName: "VOUCHER CODE", width: 150, },
        {
            field: "information",
            headerName: "VOUCHER INFORMATION",
            width: 250,
            renderCell: (params: any) => {
                return (
                    <>
                        <img

                            src={params.row.imageUrl}
                            style={{ width: "36px", height: "36px", marginRight: "16px" }}
                        />
                        {params.row.information}
                    </>
                );
            },
        },
        {
            field: "expired",
            headerName: "EXPIRED DATE",
            width: 250,
        },
        {
            field: "activeDate",
            headerName: "ACTIVED DATE",
            width: 300,

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
                            <Typography sx={{ color: "#30993B" }}>Active</Typography>
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
                            <Typography sx={{ color: "#777E91" }}>Active</Typography>
                        </Box>
                    );
            },
        },
    ];
    let body = null;

    if (rewardLoading) {
        body = (
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <CircularProgress />
            </Box>
        );
    } else if (rewards.length === 0) {
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
                        Reward Management
                    </Typography>
                    <Button
                        onClick={setShowAddRewardModal.bind(this, true)}
                        variant="contained"
                        sx={{
                            ...styles,
                            mt: "12px",
                        }}
                    >
                        + New vouchers
                    </Button>
                    <RewardManagerModal />
                    <ToastRewardSuccess />
                </Box>
                <DataGrid
                    sx={{ mr: '14px', ml: "24px", backgroundColor: ' #FFFFFF', mt: '24px' }}
                    autoHeight
                    rows={rewards}
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
