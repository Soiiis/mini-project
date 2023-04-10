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
    Stack,
} from "@mui/material";
import { textAlign } from "@mui/system";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridValueGetterParams } from "@mui/x-data-grid";
import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteManagerLocation, findLocationById, getManagerLocations } from "../../redux/apiReq/locationReq";
import { setShowDetails, setShowLocationModal } from "../../redux/slice/locationSlice";
import { setShowPostModal } from "../../redux/slice/postSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { ToastPostSuccess } from "../postManager/ToastPostSuccess";
import { LocationManagerModal } from "./locationManagerModal";
import { ToastLocationSuccess } from "./ToastLocationSuccess";
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { LocationManagerDetails } from "./locationManagerDetail";

//Style Button
const styles = {
    backgroundColor: "#2BA84A",
    "&:hover": {
        backgroundColor: "#2BA84A",
    },
};

export const LocationManagerContent = () => {
    const { locations, locationLoading, showModal } = useSelector((state: RootState) => state.locationReducer)
    const dispatch = useAppDispatch()
    //Start get all ManagerLocations
    useEffect(() => {
        dispatch(getManagerLocations());
    }, []);
    console.log(locations);


    const handleDeleteLocation = (id: string) => () => {
        dispatch(deleteManagerLocation(id))
    }
    const handleViewDetailLocation = (id: string) => () => {
        dispatch(findLocationById(id))
        dispatch(setShowDetails())
    }
    const columns = [
        { field: "addressId", headerName: "ADDRESS ID", width: 120 },
        {
            field: "address",
            headerName: "ADDRESS",
            width: 400,
            renderCell: (params: any) => {
                return (
                    <>
                        <img

                            src={params.row.imageUrl}
                            style={{ width: "36px", height: "36px", marginRight: "16px" }}
                        />
                        {params.row.address}
                    </>
                );
            },
        },
        {
            field: "location",
            headerName: "LOCATION",
            width: 150,
        },
        {
            field: "releaseDate",
            headerName: "ADDED DATE",
            width: 300,
            renderCell: (params: any) => {
                return (
                    <>

                        {dayjs(params.row.releaseDate).format('DD/MM/YYYY')}

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
                        onClick={handleDeleteLocation(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<InfoIcon />}
                        label="Delete"
                        onClick={handleViewDetailLocation(id)}
                        color="inherit"
                    />,
                ];
            },
        }
    ];
    let body = null;

    if (locationLoading) {
        body = (
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <CircularProgress />
            </Box>
        );
    } else if (locations.length === 0) {
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
                        Location Management
                    </Typography>
                    <Button
                        onClick={() => dispatch(setShowLocationModal())}
                        variant="contained"
                        sx={{
                            ...styles,
                            mt: "12px",
                        }}
                    >
                        + New new location
                    </Button>
                    <LocationManagerModal />
                    <ToastLocationSuccess />
                    <LocationManagerDetails />
                </Box>
                <DataGrid
                    sx={{ mr: '14px', ml: "24px", backgroundColor: ' #FFFFFF', mt: '24px' }}
                    autoHeight
                    rows={locations}
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
