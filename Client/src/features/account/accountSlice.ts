import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../model/IUser";
import { FieldValues } from "react-hook-form";
import requests from "../../api/request";

interface AccountState {
    user: IUser | null;
}

const initialState: AccountState = {
    user: null
}
export const loginUser = createAsyncThunk<IUser, FieldValues>(
    "account/login",
    async (data, { rejectWithValue }) => {
        try {
            const user = await requests.Account.login(data);
            localStorage.setItem("user", JSON.stringify(user)); //app'e giris yaptiktan sonra browser uzerinde user bilgisi tutuluyor
            return user;
        }
        catch (error: any) {
            return rejectWithValue({ error: error.data });
        }
    }
)

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    })
})