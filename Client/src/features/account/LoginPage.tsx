import { LockOutlined } from "@mui/icons-material"
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import requests from "../../api/request";

function LoginPage() {

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(values);
        requests.Account.login(values);
    }
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }
    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Login</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>

                    <TextField
                        name="email" value={values.email} onChange={handleInputChange}
                        label="Enter email" type="email"
                        fullWidth required autoFocus
                        sx={{ mb: 2 }} size="small">
                    </TextField>

                    <TextField
                        name="password" value={values.password} onChange={handleInputChange}
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