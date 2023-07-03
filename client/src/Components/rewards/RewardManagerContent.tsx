import {
    Box,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteManagerReward, findRewardById, getReward } from "../../redux/apiReq/rewardReq";
import { setShowRewardModal } from "../../redux/slice/rewardSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { RewardManagerModal } from "./rewardManagerModal";
import { ToastRewardSuccess } from "./ToastRewardSuccess";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { setShowDetails } from "../../redux/slice/rewardSlice";
import { RewardManagerDetails } from "./rewardManagerDetail";



//Style Button
const styles = {
    backgroundColor: "#2BA84A",
    "&:hover": {
        backgroundColor: "#2BA84A",
    },
};

export const RewardManagerContent = () => {
    const { rewards, rewardLoading } = useSelector((state: RootState) => state.rewardReducer)
    const dispatch = useAppDispatch()
    //Start get all ManagerRewards
    useEffect(() => {
        dispatch(getReward())
    }, []);
    console.log(rewards);


    const handleDeleteReward = (id: string) => () => {
        dispatch(deleteManagerReward(id))
    }
    const handleViewDetailReward = (id: string) => () => {
        dispatch(findRewardById(id))
        dispatch(setShowDetails())
    }
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
                            alt="voucher-code"
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
            renderCell: (params: any) => {
                return (
                    <>

                        {dayjs(params.row.activeDate).format('DD/MM/YYYY')}

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
                        onClick={handleDeleteReward(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<InfoIcon />}
                        label="Delete"
                        onClick={handleViewDetailReward(id)}
                        color="inherit"
                    />,
                ];
            },
        }
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
                        onClick={() => dispatch(setShowRewardModal())}
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
                    <RewardManagerDetails />
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
