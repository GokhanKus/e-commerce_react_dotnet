import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">E-Commerce</Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header