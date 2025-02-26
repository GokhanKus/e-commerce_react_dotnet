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

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
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
    }
})

export const { setCart } = cartSlice.actions
export default cartSlice.reducer
