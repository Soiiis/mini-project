import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "../../types/type"
import { addManagerPost, deleteManagerpost, findPostById, getManagerPosts } from "../apiReq/postReq"


export interface PostState {
    posts: Post[],
    postLoading: boolean,
    showModal: boolean,
    showToast: boolean,
    showDetails: boolean,
    titleDetails: string;
    imageUrlDetails: string;
}
const initialState: PostState = {
    posts: [],
    postLoading: true,
    showModal: false,
    showToast: false,
    showDetails: false,
    titleDetails: '',
    imageUrlDetails: 'string',
}

const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        setShowPostModal: (state) => {
            state.showModal = true
        },
        setClosePostModal: (state) => {
            state.showModal = false
        },
        setShowToast: (state) => {
            state.showToast = true
        },
        setCloseToast: (state) => {
            state.showToast = false
        },
        setShowDetails: (state) => {
            state.showDetails = true
        },
        setCloseDetails: (state) => {
            state.showDetails = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getManagerPosts.pending, (state, action) => {
                return {
                    ...state
                }
            })
            .addCase(getManagerPosts.fulfilled, (state, action) => {
                return {
                    ...state,
                    posts: action.payload,
                    postLoading: false
                }
            })
            .addCase(getManagerPosts.rejected, (state, action) => {
                return {
                    ...state,
                    posts: [],
                    postLoading: false
                }
            })
            .addCase(addManagerPost.pending, (state) => {
                return { ...state }
            })
            .addCase(addManagerPost.rejected, (state, action) => {
                return {
                    ...state,
                    posts: [...state.posts],
                    postLoading: false
                }
            })
            .addCase(addManagerPost.fulfilled, (state, action: PayloadAction<any>) => {
                state.posts.push(action.payload)
            })
            .addCase(deleteManagerpost.fulfilled, (state, action: PayloadAction<any>) => {
                const deletePostIndex = state.posts.findIndex(post => post._id === action.payload._id)
                state.posts.splice(deletePostIndex, 1)
                // return action.payload
            })
            .addCase(findPostById.fulfilled, (state, action: PayloadAction<any>) => {
                // const details = state.posts.filter(location => location._id === action.payload._id)
                state.titleDetails = action.payload[0].title
                state.imageUrlDetails = action.payload[0].imageUrl
            })
            .addDefaultCase((state) => {
                return state
            })
    }
})


export const { setShowPostModal, setShowToast, setClosePostModal, setCloseToast, setShowDetails, setCloseDetails } = postSlice.actions
export default postSlice.reducer