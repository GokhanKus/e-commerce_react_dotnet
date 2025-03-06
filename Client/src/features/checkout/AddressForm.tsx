import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

function AddressForm() {
    //bir sonraki adıma gecildiginde onceki adımı hatirlamak icin useFormContext..
    const { register, formState: { errors } } = useFormContext();
    return (
        <Grid2 container spacing={3}>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("firstname", { required: "firstname is required" })}
                    label="Enter firstname"
                    fullWidth autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.username}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("lastname", { required: "lastname is required" })}
                    label="Enter lastname"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.lastname}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("phone", { required: "phone is required" })}
                    label="Enter phone"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.phone}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("city", { required: "city is required" })}
                    label="Enter city"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.city}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
                <TextField
                    {...register("addressline", { required: "addressline is required" })}
                    label="Enter addressline"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.addressline}></TextField>
            </Grid2>

        </Grid2>
    )
}

export default AddressForm