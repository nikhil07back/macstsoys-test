import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage

const saveUser = JSON.parse(localStorage.getItem('user'))


const initialState = {
    user : saveUser ? saveUser : null,
    isError : false,
    isLoading : false,
    isSuccess: false,
    message : "",
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        reset : (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }   
    },
    extraReducers : (builder) => {
        builder
        .addCase(register.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected , (state , action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected , (state , action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled , (state)=>{
            state.user = null
        })
    }
})


export const register = createAsyncThunk('auth/register' , async(user , thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const login = createAsyncThunk('auth/login' , async(userData , thunkAPI)=>{

    try {
        return authService.login(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) 
    }

})


export const logout = createAsyncThunk("auth/logout" , async()=>{
   await authService.logout()
})


export const {reset} = authSlice.actions
export default authSlice.reducer