import { createContext, useReducer, useState } from 'react'
import { postManagerReducer } from '../reducers/postManagerReducer'
import { apiUrl } from './constants'
import axios from 'axios'
import React from 'react'

export const PostManagerContext = React.createContext<undefined>(undefined)

const PostManagerContextProvider = ({ children }: { children: React.ReactNode }) => {
    //state
    const [postManagerState, dispatch] = useReducer(postManagerReducer, {
        posts: [],
        postLoading: true
    })
    // state showModalPost
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    //state show Toast Post Modal
    const [showToast, setShowToast] = useState(false)
    const closeDialog = () => {
        setShowAddPostModal(false)
        setShowToast(false)
    }
    // Get all post manager
    const getManagerPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post/get-manager`)
            if (response.data.success) {
                dispatch({ type: 'POSTS_LOAD_SUCCESS', payload: response.data.posts })
                console.log('Created Post Successfully')
            }
        }
        catch (err) {
            dispatch({ type: 'POSTS_LOAD_ERROR' })
        }

    }
    //Add new Post manager
    const addManagerPost = async (newPostManager: any) => {
        try {
            const response = await axios.post(`${apiUrl}/post/create-post`, newPostManager)
            if (response.data.success) {
                dispatch({ type: 'ADD_POST_MANAGER', payload: response.data.post })
                return response.data
            }

        }
        catch (error: any) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }
    // PostManagerContextData
    const postManagerContextData: any = { postManagerState, getManagerPosts, addManagerPost, setShowAddPostModal, showAddPostModal, showToast, setShowToast, closeDialog }

    return (
        <PostManagerContext.Provider value={postManagerContextData}>
            {children}
        </PostManagerContext.Provider>
    )
}

export { PostManagerContextProvider }