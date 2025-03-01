import { TableCell, TableRow } from "@mui/material"
import { currencyTRY } from "../../utilities/formatCurrency";
import { useAppSelector } from "../../store/store";

function CartSummary() {
    const { cart } = useAppSelector(state => state.cart);
    const subTotal = cart?.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    const totalPrice = subTotal + tax;
    return (
        <>
            <TableRow>
                <TableCell align="right" colSpan={5}>Sub Total</TableCell>
                <TableCell align="right">{currencyTRY.format(subTotal)}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell align="right" colSpan={5}>Tax (%20)</TableCell>
                <TableCell align="right">{currencyTRY.format(tax)}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell align="right" colSpan={5}>Total Price</TableCell>
                <TableCell align="right">{currencyTRY.format(totalPrice)}</TableCell>
            </TableRow>
        </>
    )
}

export default CartSummary