import { LockOutlined } from "@mui/icons-material"
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material"
import { FieldValues, useForm } from "react-hook-form"
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import requests from "../../api/request";
import { toast } from "react-toastify";


function RegisterPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting, isValid } } = useForm({
        defaultValues: {
            email: "",
            password: "",
            checkPassword: "",
            name: ""
        }
    });

    const submitForm = async (data: FieldValues) => {

        await requests.Account.register(data)
            .then(() => {
                toast.success("User created successfully");
                navigate("/login");
            }).catch((result) => {
                const { data: errors } = result;
                errors.forEach((error: any) => {
                    if (error.code == "PasswordRequiresDigit") setError("password", { message: error.description })
                    else if (error.code == "PasswordRequiresUpper") setError("password", { message: error.description })
                    else if (error.code == "DuplicateEmail") setError("email", { message: error.description })
                    else if (error.code == "InvalidEmail") setError("email", { message: error.description })
                    else setError("checkPassword", { message: "validation failed" })
                })
            });

    };

    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Register</Typography>
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
                        {...register("name")}
                        label="Enter name" type="text"
                        fullWidth
                        sx={{ mb: 2 }} size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}>
                    </TextField>

                    <TextField
                        {...register("password", { required: "password is required field", minLength: { value: 6, message: "password must be at least 6 characters" } })}
                        label="Enter password" type="password"
                        fullWidth required
                        sx={{ mb: 2 }} size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}>
                    </TextField>

                    <TextField
                        {...register("checkPassword", {
                            required: "Please confirm your password",
                            validate: (value) => value === watch("password") || "Passwords must match"
                        })}
                        label="Confirm password" type="password"
                        fullWidth required
                        sx={{ mb: 2 }} size="small"
                        error={!!errors.checkPassword}
                        helperText={errors.checkPassword?.message}>
                    </TextField>

                    <LoadingButton loading={isSubmitting} disabled={!isValid}
                        type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                        Register
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    )
}

export default RegisterPage