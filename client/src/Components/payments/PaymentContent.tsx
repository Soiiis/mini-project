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
import { LocationManagerContext } from "../../contexts/LocationManagerContext";
import { PaymentRecordContext } from "../../contexts/PaymentRecordContext";
import { ToastPostSuccess } from "../postManager/ToastPostSuccess";
import { PaymentRecordModal } from "./PaymentRecordModal";
import { ToastPaymentSuccess } from "./ToastPaymentSuccess";




//Style Button
const styles = {
    backgroundColor: "#2BA84A",
    "&:hover": {
        backgroundColor: "#2BA84A",
    },
};

export const PaymentContent = () => {
    //Context
    const {
        paymentRecordState: { payments, paymentLoading },
        getPayment, setShowToast, setShowAddPaymentModal
    }: any = useContext(PaymentRecordContext);
    //Start get all ManagerLocations
    useEffect(() => {
        getPayment();
    }, []);
    console.log(payments);



    const columns = [
        { field: "logId", headerName: "LOG ID", width: 120 },
        {
            field: "title",
            headerName: "EVENT",
            width: 380,
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
            field: "moneyUsed",
            headerName: "MONEY USED",
            width: 150,
            renderCell: (params: any) => {
                return (
                    <>
                        {`$${params.row.moneyUsed}`}
                    </>

                )
            }
        },
        {
            field: "usedDate",
            headerName: "USED DATE",
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
                            <Typography sx={{ color: "#30993B" }}>Paid</Typography>
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
                            <Typography sx={{ color: "#777E91" }}>Paid</Typography>
                        </Box>
                    );
            },
        },
    ];
    let body = null;

    if (paymentLoading) {
        body = (
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <CircularProgress />
            </Box>
        );
    } else if (payments.length === 0) {
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
                        Payment Record
                    </Typography>
                    <Button
                        onClick={setShowAddPaymentModal.bind(this, true)}
                        variant="contained"
                        sx={{
                            ...styles,
                            mt: "12px",
                        }}
                    >
                        + New payment record
                    </Button>
                    <PaymentRecordModal />
                    <ToastPaymentSuccess />
                </Box>
                <DataGrid
                    sx={{ mr: '14px', ml: "24px", backgroundColor: ' #FFFFFF', mt: '24px' }}
                    autoHeight
                    rows={payments}
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
