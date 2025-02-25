import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import requests from "../../api/request";
import { toast } from "react-toastify";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utilities/formatCurrency";

function ShoppingCartPage() {

    const { cart, setCart } = useCartContext();
    const [status, setStatus] = useState({ loading: false, id: "" });

    if (cart?.cartItems.length === 0) return <Alert severity="warning">no product in your basket</Alert>

    const handleAddItem = (productId: number, id: string) => {
        setStatus({ loading: true, id: id });

        requests.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(err => console.log(err))
            .finally(() => setStatus({ loading: false, id: "" }));
    }

    const handleRemoveItem = (productId: number, id: string, quantity: number = 1) => {
        setStatus({ loading: true, id: id });

        requests.Cart.deleteItem(productId, quantity)
            .then(cart => setCart(cart))
            .catch(err => console.log(err))
            .finally(() => setStatus({ loading: false, id: "" }));
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right"></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart?.cartItems.map((item) => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row"><img src={`http://localhost:5018/images/${item.imageUrl}`} style={{ height: 60 }} /></TableCell>
                            <TableCell component="th" scope="row">{item.name}</TableCell>
                            <TableCell align="right">{currencyTRY.format(item.price)}</TableCell>
                            <TableCell align="right">

                                <LoadingButton loading={status.loading && status.id === "add_" + item.productId}
                                    onClick={() => handleAddItem(item.productId, "add_" + item.productId)}>
                                    <AddCircleOutline />
                                </LoadingButton>

                                {item.quantity}

                                <LoadingButton loading={status.loading && status.id === "remove_" + item.productId}
                                    onClick={() => handleRemoveItem(item.productId, "remove_" + item.productId)}>
                                    <RemoveCircleOutline />
                                </LoadingButton>

                            </TableCell>
                            <TableCell align="right">{currencyTRY.format(item.price * item.quantity)} ₺</TableCell>

                            <TableCell align="right">
                                <LoadingButton color="error" loading={status.loading && status.id === "remove_all" + item.productId}
                                    onClick={() => {
                                        handleRemoveItem(item.productId, "remove_all" + item.productId, item.quantity);
                                        toast.error("item's removed from your basket")
                                    }}>
                                    <Delete />

                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <CartSummary />
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ShoppingCartPage