import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../model/IUser";
import { FieldValues } from "react-hook-form";
import requests from "../../api/request";
import { router } from "../../router/Router";
import { _NEVER } from "@reduxjs/toolkit/query";

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
export const getUser = createAsyncThunk<IUser>(
    "account/getuser",
    async (_NEVER, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));

        try {
            const user = await requests.Account.getUser();
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem("user"))
                return false;
        }
    }
)
export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            router.navigate("/catalog");
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(getUser.rejected, (state,) => {
            state.user = null;
            localStorage.removeItem("user");
            router.navigate("/login");
        })
    })
})
export const { logout, setUser } = accountSlice.actions; 