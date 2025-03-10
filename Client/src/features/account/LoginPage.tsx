import { LockOutlined } from "@mui/icons-material"
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material"
import { FieldValues, useForm } from "react-hook-form"
import { LoadingButton } from "@mui/lab";
import { loginUser } from "./accountSlice";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../store/store";
import { getCart } from "../cart/cartSlice";


function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const submitForm = async (data: FieldValues) => {
        const result = await dispatch(loginUser(data));
        await dispatch(getCart());

        if (loginUser.fulfilled.match(result)) { //login basariliysa catalog sayfasina yonlendirilsin
            navigate(location.state?.from || "/catalog");
        }
    };
    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Login</Typography>
                <Box onSubmit={handleSubmit(submitForm)} component="form" noValidate sx={{ mt: 2 }}>

                    <TextField
                        {...register("email", { required: "email is required field" })}
                        label="Enter email" type="email"
                        fullWidth required autoFocus
                        sx={{ mb: 2 }} size="small"
                        error={!!errors.email}
                        helperText={errors.email?.message}>
                    </TextField>

                    <TextField
                        {...register("password", { required: "password is required field", minLength: { value: 6, message: "min length least 6 characters" } })}
                        label="Enter password" type="password"
                        fullWidth required
                        sx={{ mb: 2 }} size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}>
                    </TextField>

                    <LoadingButton loading={isSubmitting} disabled={!isValid}
                        type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                        Login
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginPage