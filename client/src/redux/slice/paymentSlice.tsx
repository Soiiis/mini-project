import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Payment } from "../../types/type"
import { addPayment, deletePayment, findPaymentById, getPayment } from "../apiReq/paymentReq"

export interface PaymentState {
    payments: Payment[],
    paymentLoading: boolean,
    showModal: boolean,
    showToast: boolean,
    showDetails: boolean,
    titleDetails: string;
    imageUrlDetails: string;
}
const initialState: PaymentState = {
    payments: [],
    paymentLoading: true,
    showModal: false,
    showToast: false,
    showDetails: false,
    titleDetails: '',
    imageUrlDetails: '',
}
const paymentSlice = createSlice({
    name: 'payment',
    initialState: initialState,
    reducers: {
        setShowPaymentModal: (state) => {
            state.showModal = true
        },
        setClosePaymentModal: (state) => {
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
            .addCase(getPayment.pending, (state, action) => {
                return {
                    ...state
                }
            })
            .addCase(getPayment.fulfilled, (state, action) => {
                return {
                    ...state,
                    payments: action.payload,
                    paymentLoading: false
                }
            })
            .addCase(getPayment.rejected, (state, action) => {
                return {
                    ...state,
                    payments: [],
                    paymentLoading: false
                }
            })
            .addCase(addPayment.pending, (state) => {
                return { ...state }
            })
            .addCase(addPayment.rejected, (state, action) => {
                return {
                    ...state,
                    payments: [...state.payments],
                    paymentLoading: false
                }
            })
            .addCase(addPayment.fulfilled, (state, action: PayloadAction<any>) => {
                state.payments.push(action.payload)
            })
            .addCase(deletePayment.fulfilled, (state, action: PayloadAction<any>) => {
                const deleteLocationIndex = state.payments.findIndex(location => location._id === action.payload._id)
                state.payments.splice(deleteLocationIndex, 1)
            })
            .addCase(findPaymentById.fulfilled, (state, action: PayloadAction<any>) => {
                // const details = state.payments.filter(location => location._id === action.payload._id)
                state.titleDetails = action.payload[0].title
                state.imageUrlDetails = action.payload[0].imageUrl
            })
            .addDefaultCase((state, action) => {
                return state
            })
    }
})

export const { setShowPaymentModal, setClosePaymentModal, setShowToast, setCloseToast, setShowDetails, setCloseDetails } = paymentSlice.actions
export default paymentSlice.reducer