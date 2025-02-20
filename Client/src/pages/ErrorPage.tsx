import { Button, Container, Stack } from '@mui/material'
import requests from '../api/request'

function ErrorPage() {
    return (
        <Container>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.getBadRequestError().catch(err => console.log(err))}>
                400 Bad Request Error
            </Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.getUnauthorizedError().catch(err => console.log(err))}>
                401 Unauthorized Error
            </Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.getNotFoundError().catch(err => console.log(err))}>
                404 Not Found Error
            </Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.getServerError().catch(err => console.log(err))}>
                500 Server Error
            </Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.getValidationError().catch(err => console.log(err))}>
                Validation Errors
            </Button>
        </Container>
    )
}

export default ErrorPage