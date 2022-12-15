export const paymentRecordReducer = (state: any, action: any) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        case 'PAYMENT_LOAD_SUCCESS':
            return {
                ...state,
                payments: payload,
                paymentLoading: false
            }
        case 'PAYMENT_LOAD_ERROR':
            return {
                ...state,
                payments: [],
                paymentLoading: false
            }
        case 'ADD_PAYMENT_RECORD':
            return {
                ...state,
                payments: [...state.payments, payload]
            }
        default:
            return state;
    }
};