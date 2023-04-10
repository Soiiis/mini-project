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
import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deletePayment, findPaymentById, getPayment } from "../../redux/apiReq/paymentReq";
import { setShowPaymentModal } from "../../redux/slice/paymentSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { ToastPostSuccess } from "../postManager/ToastPostSuccess";
import { PaymentRecordModal } from "./PaymentRecordModal";
import { ToastPaymentSuccess } from "./ToastPaymentSuccess";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { setShowDetails } from "../../redux/slice/paymentSlice";
import { PaymentManagerDetails } from "./paymentManagerDetail";





//Style Button
const styles = {
    backgroundColor: "#2BA84A",
    "&:hover": {
        backgroundColor: "#2BA84A",
    },
};


export const PaymentContent = () => {
    const dispatch = useAppDispatch()
    const { payments, paymentLoading, showModal } = useSelector((state: RootState) => state.paymentReducer)
    //Start get all ManagerLocations
    useEffect(() => {
        dispatch(getPayment());
    }, []);
    console.log(payments);


    const handleDeletePayment = (id: string) => () => {
        dispatch(deletePayment(id))
    }
    const handleViewDetailPayment = (id: string) => () => {
        dispatch(findPaymentById(id))
        dispatch(setShowDetails())
    }
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
            renderCell: (params: any) => {
                return (
                    <>

                        {dayjs(params.row.usedDate).format('DD/MM/YYYY')}

                    </>
                )
            }

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
        {
            field: 'actions',
            type: 'actions',
            headerName: 'ACTIONS',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }: any) => {
                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeletePayment(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<InfoIcon />}
                        label="Delete"
                        onClick={handleViewDetailPayment(id)}
                        color="inherit"
                    />,
                ];
            },
        }
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
                        onClick={() => dispatch(setShowPaymentModal())}
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
                    <PaymentManagerDetails />
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
