import { createReducer, createAction } from '@reduxjs/toolkit'
import { User } from '../../types/type'


export interface AuthSate {
    authLoading: boolean,
    isAuthenticated: boolean,
    user: User[] | null,
}
const initialState: AuthSate = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
}

export const setAuth = createAction<AuthSate>("SET_AUTH")

const authReducer = createReducer(initialState, builder => {
    builder.addCase(setAuth, (state, action) => {
        const { isAuthenticated, user } = action.payload
        return { ...state, authLoading: false, isAuthenticated, user }
    })
})

export default authReducer