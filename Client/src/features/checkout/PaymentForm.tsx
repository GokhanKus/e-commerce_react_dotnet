import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

function PaymentForm() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <Grid2 container spacing={3}>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("cardname", { required: "Card name is required" })}
                    label="Enter card name"
                    fullWidth autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardname}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("cardnumber", { required: "Card number is required" })}
                    label="Enter card number"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardnumber}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 4 }}>
                <TextField
                    {...register("cardexpiremonth", { required: "Expire month is required" })}
                    label="Enter expire month"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardexpirymonth}></TextField>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 4 }}>
                <TextField
                    {...register("cardexpireyear", { required: "Expire year is required" })}
                    label="Enter expire year"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardexpiryyear}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 4 }}>
                <TextField
                    {...register("cardcvc", { required: "Cvv is required" })}
                    label="Enter cvv"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardcvc}></TextField>
            </Grid2>

        </Grid2>
    )
}

export default PaymentForm