import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Reward } from "../../types/type"
import { addReward, deleteManagerReward, findRewardById, getReward } from "../apiReq/rewardReq"

export interface RewardState {
    rewards: Reward[],
    rewardLoading: boolean,
    showModal: boolean,
    showToast: boolean,
    showDetails: boolean,
    informationDetails: string;
    imageUrlDetails: string;

}
const initialState: RewardState = {
    rewards: [],
    rewardLoading: true,
    showModal: false,
    showToast: false,
    showDetails: false,
    informationDetails: '',
    imageUrlDetails: '',
}
const rewardSlice = createSlice({
    name: 'reward',
    initialState: initialState,
    reducers: {
        setShowRewardModal: (state) => {
            state.showModal = true
        },
        setCloseRewardModal: (state) => {
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
            .addCase(getReward.pending, (state, action) => {
                return {
                    ...state
                }
            })
            .addCase(getReward.fulfilled, (state, action) => {
                return {
                    ...state,
                    rewards: action.payload,
                    rewardLoading: false
                }
            })
            .addCase(getReward.rejected, (state, action) => {
                return {
                    ...state,
                    rewards: [],
                    rewardLoading: false
                }
            })
            .addCase(addReward.pending, (state) => {
                return { ...state }
            })
            .addCase(addReward.rejected, (state, action) => {
                return {
                    ...state,
                    rewards: [...state.rewards],
                    rewardLoading: false
                }
            })
            .addCase(addReward.fulfilled, (state, action: PayloadAction<any>) => {
                state.rewards.push(action.payload)
            })
            .addCase(deleteManagerReward.fulfilled, (state, action: PayloadAction<any>) => {
                const deleteRewardIndex = state.rewards.findIndex(reward => reward._id === action.payload._id)
                state.rewards.splice(deleteRewardIndex, 1)
            })
            .addCase(findRewardById.fulfilled, (state, action: PayloadAction<any>) => {
                // const details = state.rewards.filter(reward => reward._id === action.payload._id)
                state.informationDetails = action.payload[0].information
                state.imageUrlDetails = action.payload[0].imageUrl
            })
            .addDefaultCase((state, action) => {
                return state
            })
    }
})

export const { setShowRewardModal, setCloseRewardModal, setShowToast, setCloseToast, setShowDetails, setCloseDetails } = rewardSlice.actions
export default rewardSlice.reducer