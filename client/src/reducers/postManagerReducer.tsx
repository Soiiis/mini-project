export const postManagerReducer = (state: any, action: any) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        case 'POSTS_LOAD_SUCCESS':
            return {
                ...state,
                posts: payload,
                postLoading: false
            }
        case 'POSTS_LOAD_ERROR':
            return {
                ...state,
                posts: [],
                postLoading: false
            }
        case 'ADD_POST_MANAGER':
            return {
                ...state,
                posts: [...state.posts, payload]
            }
        default:
            return state;
    }
};