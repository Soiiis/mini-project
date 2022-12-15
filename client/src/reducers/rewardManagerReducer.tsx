export const rewardManagerReducer = (state: any, action: any) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        case 'REWARD_LOAD_SUCCESS':
            return {
                ...state,
                rewards: payload,
                rewardLoading: false
            }
        case 'REWARD_LOAD_ERROR':
            return {
                ...state,
                rewards: [],
                rewardLoading: false
            }
        case 'ADD_REWARD_MANAGER':
            return {
                ...state,
                rewards: [...state.rewards, payload]
            }
        default:
            return state;
    }
};