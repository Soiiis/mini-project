import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/type'
import { loadUser } from '../apiReq/authReq'


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
            .addCase(loadUser.pending, (state) => {
                state.authLoading = true
            })
            .addCase(loadUser.rejected, (state) => {
                state.authLoading = false
                state.isAuthenticated = false
                // return authSlice.caseReducers.logOut(state)
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                return authSlice.caseReducers.setAuth(state, action)
            })
            .addDefaultCase((state) => {
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