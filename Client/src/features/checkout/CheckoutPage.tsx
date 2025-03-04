import { Paper, Grid2 } from "@mui/material";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Info from "./Info";

function CheckoutPage() {

    return (
        <Paper>
            <Grid2 container sx={{ p: 4 }} spacing={5}>
                <Grid2 size={4}>
                    <Info />
                </Grid2>
                <Grid2 size={8}>
                    <AddressForm />
                    <PaymentForm />
                    <Review />
                </Grid2>
            </Grid2>
        </Paper>
    );

}

export default CheckoutPage