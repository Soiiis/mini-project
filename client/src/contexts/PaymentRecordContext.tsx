import { createContext, useReducer, useState } from 'react'
import { paymentRecordReducer } from '../reducers/paymentRecord'
import { apiUrl } from './constants'
import axios from 'axios'
import React from 'react'

export const PaymentRecordContext = React.createContext<undefined>(undefined)

const PaymentRecordContextProvider = ({ children }: { children: React.ReactNode }) => {
    //state
    const [paymentRecordState, dispatch] = useReducer(paymentRecordReducer, {
        payments: [],
        paymentLoading: true
    })
    // state showModal Location
    const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)
    //state show Toast Location Modal
    const [showToast, setShowToast] = useState(false)
    const closeDialog = () => {
        setShowAddPaymentModal(false)
        setShowToast(false)
    }
    // Get all payment manager
    const getPayment = async () => {
        try {
            const response = await axios.get(`${apiUrl}/payment/get-payment`)
            if (response.data.success) {
                dispatch({ type: 'PAYMENT_LOAD_SUCCESS', payload: response.data.payments })
            }
        }
        catch (err) {
            dispatch({ type: 'PAYMENT_LOAD_ERROR' })
        }

    }
    //Add new Location manager
    const addPayment = async (newPaymentManager: any) => {
        try {
            const response = await axios.post(`${apiUrl}/payment/create-payment`, newPaymentManager)
            if (response.data.success) {
                dispatch({ type: 'ADD_PAYMENT_RECORD', payload: response.data.payment })
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
    const paymentRecordContextData: any = { paymentRecordState, getPayment, addPayment, showAddPaymentModal, setShowAddPaymentModal, showToast, setShowToast, closeDialog }

    return (
        <PaymentRecordContext.Provider value={paymentRecordContextData}>
            {children}
        </PaymentRecordContext.Provider>
    )
}

export { PaymentRecordContextProvider }