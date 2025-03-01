import { LockOutlined } from "@mui/icons-material"
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { FieldValues, useForm } from "react-hook-form"
import requests from "../../api/request";


function LoginPage() {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const submitForm = async (data: FieldValues) => {
        console.log(data);
        await requests.Account.login(data);
    }
    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Login</Typography>
                <Box onSubmit={handleSubmit(submitForm)} component="form" noValidate sx={{ mt: 2 }}>

                    <TextField
                        {...register("email")}
                        label="Enter email" type="email"
                        fullWidth required autoFocus
                        sx={{ mb: 2 }} size="small">
                    </TextField>

                    <TextField
                        {...register("password")}
                        label="Enter password" type="password"
                        fullWidth required
                        sx={{ mb: 2 }} size="small">
                    </TextField>

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>Login</Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginPage