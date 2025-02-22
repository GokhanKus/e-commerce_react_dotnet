import { useEffect, useState } from "react"
import requests from "../../api/request"
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ICart } from "../../model/ICart";
import { Delete, ImportExport } from "@mui/icons-material";

function ShoppingCartPage() {

    const [cart, setCart] = useState<ICart | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        requests.Cart.get()
            .then(cart => setCart(cart))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return <CircularProgress />
    if (!cart) return <h1>Empty Cart</h1>
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
                    {cart.cartItems.map((item) => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row"><img src={`http://localhost:5018/images/${item.imageUrl}`} style={{ height: 60 }} /></TableCell>
                            <TableCell component="th" scope="row">{item.name}</TableCell>
                            <TableCell align="right">{item.price} ₺</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">{item.price * item.quantity} ₺</TableCell>

                            <TableCell align="right">
                                <IconButton color="error">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ShoppingCartPage