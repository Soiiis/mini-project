import { createReducer, createAction, createSlice, PayloadAction, current, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../../constants/constants'
import { User } from '../../types/type'
import { setAuthToken } from '../../utils/setAuthToken'
import { loadUser, loginUser } from '../apiReq/authReq'


export interface AuthState {
    authLoading: boolean,
    isAuthenticated: boolean,
    user: User[] | null,
    isLogout: boolean
}
const initialState: AuthState = {
    authLoading: false,
    isAuthenticated: false,
    user: null,
    isLogout: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {

            const { user, isAuthenticated } = action.payload
            // const user = action.payload.user || null
            return { ...state, authLoading: false, isAuthenticated: true, user }
        },
        logOut: (state) => {
            return { ...state, authLoading: false, isAuthenticated: false, user: null, isLogout: true }
        }

    },
    extraReducers(builder) {
        builder
            .addCase(loadUser.pending, (state, action) => {
                state.authLoading = true
            })
            .addCase(loadUser.rejected, (state, action: PayloadAction<any>) => {
                state.authLoading = false
                state.isAuthenticated = false
                // return authSlice.caseReducers.logOut(state)
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                return authSlice.caseReducers.setAuth(state, action)
            })
            .addDefaultCase((state, action) => {
                return state
            })

    }

})

export const { setAuth, logOut } = authSlice.actions

export default authSlice.reducer


// export const setAuth = createAction<AuthSate>("SET_AUTH")

// const authReducer = createReducer(initialState, builder => {
//     builder.addCase(setAuth, (state, action) => {
//         const { isAuthenticated, user } = action.payload
//         return { ...state, authLoading: false, isAuthenticated, user }
//     })

// })
// 