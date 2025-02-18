import { AppBar, Container, Toolbar, Typography } from '@mui/material';

function Header() {
    return (
        <>
            <AppBar sx={{ mb: 4 }} position="static">
                <Toolbar>
                    <Container>
                        <Typography variant="h6">E-Commerce</Typography>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header