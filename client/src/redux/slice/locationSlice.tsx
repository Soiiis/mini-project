
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Location } from '../../types/type'
import { addManagerLocation, deleteManagerLocation, findLocationById, getManagerLocations } from '../apiReq/locationReq'
export interface LocationState {
    locations: Location[],
    locationLoading: boolean,
    showModal: boolean,
    showToast: boolean,
    showDetails: boolean,
    addressDetails: string;
    imageUrlDetails: string;
}

const initialState: LocationState = {
    locations: [],
    locationLoading: true,
    showModal: false,
    showToast: false,
    showDetails: false,
    addressDetails: '',
    imageUrlDetails: '',

}

const locationSlice = createSlice({
    name: 'location',
    initialState: initialState,
    reducers: {
        setShowLocationModal: (state) => {
            state.showModal = true
        },
        setCloseLocationModal: (state) => {
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
            .addCase(getManagerLocations.pending, (state, action) => {
                return {
                    ...state
                }
            })
            .addCase(getManagerLocations.fulfilled, (state, action) => {
                return {
                    ...state,
                    locations: action.payload,
                    locationLoading: false
                }
            })
            .addCase(getManagerLocations.rejected, (state, action) => {
                return {
                    ...state,
                    locations: [],
                    locationLoading: false
                }
            })
            .addCase(addManagerLocation.pending, (state) => {
                return { ...state }
            })
            .addCase(addManagerLocation.rejected, (state, action) => {
                return {
                    ...state,
                    locations: [...state.locations],
                    locationLoading: false
                }
            })
            .addCase(addManagerLocation.fulfilled, (state, action: PayloadAction<any>) => {
                state.locations.push(action.payload)
            })
            .addCase(deleteManagerLocation.fulfilled, (state, action: PayloadAction<any>) => {
                const deleteLocationIndex = state.locations.findIndex(location => location._id === action.payload._id)
                state.locations.splice(deleteLocationIndex, 1)
            })
            .addCase(findLocationById.fulfilled, (state, action: PayloadAction<any>) => {
                // const details = state.locations.filter(location => location._id === action.payload._id)
                state.addressDetails = action.payload[0].address
                state.imageUrlDetails = action.payload[0].imageUrl
            })
            .addDefaultCase((state, action) => {
                return state
            })
    }
})

export const { setShowLocationModal, setCloseLocationModal, setShowToast, setCloseToast, setShowDetails, setCloseDetails } = locationSlice.actions
export default locationSlice.reducer