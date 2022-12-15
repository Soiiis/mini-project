export const locationManagerReducer = (state: any, action: any) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        case 'LOCATIONS_LOAD_SUCCESS':
            return {
                ...state,
                locations: payload,
                locationLoading: false
            }
        case 'lOCATIONS_LOAD_ERROR':
            return {
                ...state,
                locations: [],
                locationLoading: false
            }
        case 'ADD_LOCATION_MANAGER':
            return {
                ...state,
                locations: [...state.locations, payload]
            }
        default:
            return state;
    }
};