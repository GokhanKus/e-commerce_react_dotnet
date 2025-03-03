import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart } from "../../model/ICart";
import requests from "../../api/request";

interface CartState {
    cart: ICart | null,
    status: string
}

const initialState: CartState = {
    cart: null,
    status: "idle"
}

export const addItemToCart = createAsyncThunk<ICart, { productId: number, quantity?: number }>(
    "cart/addItemToCart",
    async ({ productId, quantity = 1 }) => {
        try {
            return await requests.Cart.addItem(productId, quantity);
        }
        catch (error) {
            console.log(error);
        }
    }
)
export const deleteItemFromCart = createAsyncThunk<ICart, { productId: number, quantity?: number, key?: string }>(
    "cart/deleteItemFromCart",
    async ({ productId, quantity = 1 }) => {
        try {
            return await requests.Cart.deleteItem(productId, quantity);
        }
        catch (error) {
            console.log(error);
        }
    }
)

export const getCart = createAsyncThunk<ICart>(
    "cart/getcart",
    async (_, thunkAPI) => {
        try {
            return await requests.Cart.get()
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.pending, (state, action) => {
            console.log(action);
            state.status = "pendingAddItem" + action.meta.arg.productId; //urunu sepete eklemek icin butona basarken sadece o itemda loading animasyon cıksın
        })
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "idle";
        })
        builder.addCase(addItemToCart.rejected, (state) => {
            state.status = "idle";
        })
        builder.addCase(deleteItemFromCart.pending, (state, action) => {
            console.log(action);
            state.status = "pendingDeleteItem" + action.meta.arg.productId + action.meta.arg.key; //urunu sepetten silmek icin butona basarken sadece o itemda loading animasyon cıksın
        })
        builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "idle";
        })
        builder.addCase(deleteItemFromCart.rejected, (state) => {
            state.status = "idle";
        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload;
        })
        builder.addCase(getCart.rejected, (_, action) => {
            console.log(action.payload);
        })
    }
})

export const { setCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
