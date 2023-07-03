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
import ViewIcon from "../../images/viewIcon.png";
import { deleteManagerpost, findPostById, getManagerPosts } from "../../redux/apiReq/postReq";
import { setShowPostModal } from "../../redux/slice/postSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { PostManagerModal } from "./postManagerModal";
import { ToastPostSuccess } from "./ToastPostSuccess";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { setShowDetails } from "../../redux/slice/postSlice";
import { PostManagerDetails } from "./postManagerDetail";


//Style Button
const styles = {
    backgroundColor: "#2BA84A",
    "&:hover": {
        backgroundColor: "#2BA84A",
    },
};

export const PostManagerContent = () => {
    //Context
    // const {
    //     postManagerState: { posts, postLoading },
    //     getManagerPosts, setShowToast, setShowAddPostModal
    // }: any = useContext(PostManagerContext);
    // const posts = useSelector((state: RootState) => state.postReducer.posts)
    // const postLoading = useSelector((state: RootState) => state.postReducer.postLoading)
    const { posts, postLoading, showModal } = useSelector((state: RootState) => state.postReducer)
    console.log(posts);
    console.log(showModal);


    const handleDeletePost = (id: string) => () => {
        dispatch(deleteManagerpost(id))
    }
    const handleViewDetailPost = (id: string) => () => {
        dispatch(findPostById(id))
        dispatch(setShowDetails())
    }
    const dispatch = useAppDispatch()

    //Start get all ManagerPosts
    useEffect(() => {
        dispatch(getManagerPosts());
    }, []);
    console.log(posts);

    const handleShowModal = () => {
        dispatch(setShowPostModal())
    }
    const columns = [
        { field: "postId", headerName: "POST ID", width: 120, },
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
                            alt="post-id"
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
            renderCell: (params: any) => {
                return (
                    <>

                        {dayjs(params.row.releaseDate).format('DD/MM/YYYY')}

                    </>
                )
            }
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
                            alt="view-icon"
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
                        onClick={handleDeletePost(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<InfoIcon />}
                        label="Delete"
                        onClick={handleViewDetailPost(id)}
                        color="inherit"
                    />,
                ];
            },
        }
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
                        onClick={handleShowModal}
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
                    <PostManagerDetails />
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
