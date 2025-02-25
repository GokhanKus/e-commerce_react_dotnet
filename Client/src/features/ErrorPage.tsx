import { Alert, AlertTitle, Button, Container, List, ListItem, ListItemText } from '@mui/material'
import requests from '../api/request'
import { useState } from 'react';

function ErrorPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const getValidationErrors = () => {
        requests.Errors.getValidationError()
            .catch(errors => setValidationErrors(errors))
    }

    return (

        <Container>
            {
                validationErrors.length > 0 && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        <AlertTitle>Validation Errors</AlertTitle>
                        <List>
                            {
                                validationErrors.map((error, index) => (
                                    <ListItem key={index}>
                                        <ListItemText>{error}</ListItemText>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Alert>
                )
            }
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
            <Button sx={{ mr: 2 }} variant="contained" onClick={getValidationErrors}>
                Validation Errors
            </Button>
        </Container>

    )
}

export default ErrorPage