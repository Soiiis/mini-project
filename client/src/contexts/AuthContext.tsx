import React, {
    createContext,
    useReducer,
    useEffect,
    useLayoutEffect,
} from "react";
import { authReducer } from "../reducers/authReducer";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import { setAuthToken } from "../utils/setAuthToken";
import { useDispatch } from "react-redux";
import { AuthSate, setAuth } from "../Components/auth/authReducer";

// interface AuthSate {
//     authLoading : boolean,
//     isAuthenticated : boolean,
// }

// const defaultState = {
//     authLoading: true,
//     isAuthenticated: false,
// }
export const AuthContext = React.createContext<undefined>(undefined);
const AutheContextProvider = ({ children }: { children: React.ReactNode }) => {
    // const dispatch = useDispatch()
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    //Authentication user
    const loadUser: any = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }
        try {
            const response = await axios.get(`${apiUrl}/auth/check`);
            if (response.data.success) {
                dispatch({
                    type: "SET_AUTH",
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
                // dispatch(setAuth({ isAuthenticated: true, user: response.data.user } as any));
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: "SET_AUTH",
                payload: { isAuthenticated: false, user: null },
            });
        }
    };
    useEffect(() => {
        loadUser();
    }, []);
    //login
    const loginUser = async (userForm: any) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            console.log(response);

            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
            }
            await loadUser();
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };
    //register
    const registerUser = async (userForm: any) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm);
            console.log(response);

            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
            }
            await loadUser()
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };
    //logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);

        dispatch({
            type: "SET_AUTH",
            payload: { isAuthenticated: false, user: null },
        });
    };
    const authContextData: any = {
        loginUser,
        registerUser,
        authState,
        logoutUser,
    };
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};
export { AutheContextProvider };
