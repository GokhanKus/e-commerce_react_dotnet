import { ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router';

const links = [
    { title: "Home", to: "/" },
    { title: "Catalog", to: "/catalog" },
    { title: "About", to: "/about" },
    { title: "Contact", to: "/contact" },
]

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
        color: "success.dark"
    },
    "&.active": {
        color: "success.light"
    }
}

function Header() {
    return (
        <>
            <AppBar sx={{ mb: 4 }} position="static">

                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6">E-Commerce</Typography>
                        <Stack direction="row" spacing={2}>
                            {
                                links.map(link =>
                                    <Button key={link.to} sx={navStyles} component={NavLink} to={link.to}>{link.title}</Button>
                                )
                            }
                        </Stack>
                    </Box>

                    <Box>
                        <IconButton size="large" edge="start" color="inherit">
                            <Badge badgeContent="2" color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header