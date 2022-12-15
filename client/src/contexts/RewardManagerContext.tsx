import { createContext, useReducer, useState } from 'react'
import { postManagerReducer } from '../reducers/postManagerReducer'
import { apiUrl } from './constants'
import axios from 'axios'
import React from 'react'
import { rewardManagerReducer } from '../reducers/rewardManagerReducer'

export const RewardManagerContext = React.createContext<undefined>(undefined)

const RewardManagerContextProvider = ({ children }: { children: React.ReactNode }) => {
    //state
    const [rewardManagerState, dispatch] = useReducer(rewardManagerReducer, {
        rewards: [],
        rewardLoading: true
    })
    // state showModalPost
    const [showAddRewardModal, setShowAddRewardModal] = useState(false)
    //state show Toast Post Modal
    const [showToast, setShowToast] = useState(false)
    const closeDialog = () => {
        setShowAddRewardModal(false)
        setShowToast(false)
    }
    // Get all post manager
    const getReward = async () => {
        try {
            const response = await axios.get(`${apiUrl}/reward/get-reward`)
            if (response.data.success) {
                dispatch({ type: 'REWARD_LOAD_SUCCESS', payload: response.data.rewards })
                console.log('Created Post Successfully')
            }
        }
        catch (err) {
            dispatch({ type: 'REWARD_LOAD_ERROR' })
        }

    }
    //Add new Post manager
    const addReward = async (newRewardManager: any) => {
        try {
            const response = await axios.post(`${apiUrl}/reward/create-reward`, newRewardManager)
            if (response.data.success) {
                dispatch({ type: 'ADD_REWARD_MANAGER', payload: response.data.reward })
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
    const rewardManagerContextData: any = { rewardManagerState, getReward, addReward, setShowAddRewardModal, showAddRewardModal, showToast, setShowToast, closeDialog }

    return (
        <RewardManagerContext.Provider value={rewardManagerContextData}>
            {children}
        </RewardManagerContext.Provider>
    )
}

export { RewardManagerContextProvider }