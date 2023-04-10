import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
} from "@mui/material";
import IconPost from "../../images/IconPostColor.png";
import IconLocation from "../../images/IconLocationColor.png";
import IconReward from "../../images/IconRewardColor.png";
import IconPayment from "../../images/IconPaymentColor.png";
import { useContext } from "react";

import { PostManagerModal } from "../postManager/postManagerModal";
import { ToastPostSuccess } from "../postManager/ToastPostSuccess";
import { Navigate } from "react-router-dom";
import { RewardManagerModal } from "../rewards/rewardManagerModal";
import { ToastRewardSuccess } from "../rewards/ToastRewardSuccess";
import { LocationManagerModal } from "../locationManager/locationManagerModal";
import { ToastLocationSuccess } from "../locationManager/ToastLocationSuccess";
import { PaymentRecordModal } from "../payments/PaymentRecordModal";
import { ToastPaymentSuccess } from "../payments/ToastPaymentSuccess";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setShowPostModal } from "../../redux/slice/postSlice";
import { setShowLocationModal } from "../../redux/slice/locationSlice";
import { setShowPaymentModal } from "../../redux/slice/paymentSlice";
import { setShowRewardModal } from "../../redux/slice/rewardSlice";


const styles = {
    backgroundColor: "#2BA84A",
    "&:hover": {
        backgroundColor: "#2BA84A",
    },
};

export const Content = () => {
    const dispatch = useAppDispatch()
    //context


    return (
        <Box sx={{ display: "flex", ml: "24px", mt: "16px" }}>
            <Box sx={{ mr: "24px", }}>
                <Card sx={{ width: "590px", border: '1px solid #EBEAED' }}>
                    <CardContent>
                        <img src={IconPost} style={{ width: "40px", height: "48px" }} />
                        <Typography variant="h6">Add a new post</Typography>
                        <Typography>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                            amet sint. Velit officia consequat duis enim velit mollit.{" "}
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                ...styles,
                                mt: 2,
                            }}
                            onClick={() => dispatch(setShowPostModal())}
                        >
                            New Post
                        </Button>
                        <PostManagerModal />
                        <ToastPostSuccess />
                    </CardContent>
                </Card>
                <Card sx={{ width: "590px", mt: '24px', border: '1px solid #EBEAED' }}>
                    <CardContent>
                        <img src={IconReward} style={{ width: "40px", height: "48px" }} />
                        <Typography variant="h6">Add new rewards and vouchers</Typography>
                        <Typography>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                            amet sint. Velit officia consequat duis enim velit mollit.{" "}
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                ...styles,
                                mt: 2,
                            }}
                            onClick={() => dispatch(setShowRewardModal())}
                        >
                            Add Reward
                        </Button>
                        <RewardManagerModal />
                        <ToastRewardSuccess />
                    </CardContent>
                </Card>
            </Box>
            <Box>
                <Card sx={{ width: "590px", border: '1px solid #EBEAED' }}>
                    <CardContent>
                        <img src={IconLocation} style={{ width: "40px", height: "48px" }} />
                        <Typography variant="h6">
                            Add a new location to the application map
                        </Typography>
                        <Typography>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                            amet sint. Velit officia consequat duis enim velit mollit.{" "}
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                ...styles,
                                mt: 2,
                            }}
                            onClick={() => dispatch(setShowLocationModal())}
                        >
                            Add Location
                        </Button>
                        <LocationManagerModal />
                        <ToastLocationSuccess />
                    </CardContent>
                </Card>
                <Card sx={{ width: "590px", mt: '24px', border: '1px solid #EBEAED' }}>
                    <CardContent>
                        <img src={IconPayment} style={{ width: "54px", height: "48px" }} />
                        <Typography variant="h6">
                            Update the amount of used money for donations
                        </Typography>
                        <Typography>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                            amet sint. Velit officia consequat duis enim velit mollit.{" "}
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                ...styles,
                                mt: 2,
                            }}
                            onClick={() => dispatch(setShowPaymentModal())}
                        >
                            Add new payment record
                        </Button>
                        <PaymentRecordModal />
                        <ToastPaymentSuccess />
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};
