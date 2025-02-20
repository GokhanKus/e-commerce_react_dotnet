import { Card, Container, Divider, Typography } from '@mui/material'
import { useLocation } from 'react-router'

function ServerError() {
    // request.ts'teki burada state'e erismek icin useLocation() .. router.navigate("/server-error", { state: { error: data, status: status } });
    const { state } = useLocation();
    return (
        <Container component={Card} sx={{ p: 3 }}>
            {
                state?.error ?
                    <>
                        <Typography variant='h3' gutterBottom>{state.error.title} - {state.status}</Typography>
                        <Divider />
                        <Typography variant='body2'>{state.error.detail || "Unknown Error"}</Typography>
                    </>
                    :
                    <Typography variant='h5'>Server Error</Typography>
            }
        </Container>
    )
}

export default ServerError