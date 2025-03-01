import { ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router';
import { useAppSelector } from '../hooks/hooks';

const links = [
    { title: "Home", to: "/" },
    { title: "Catalog", to: "/catalog" },
    { title: "About", to: "/about" },
    { title: "Contact", to: "/contact" },
    { title: "Error", to: "/error" },
]
const authLinks = [
    { title: "Login", to: "/login" },
    { title: "Register", to: "/register" },
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

    const { cart } = useAppSelector(state => state.cart);
    const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0);
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

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton component={Link} to="/cart" size="large" edge="start" color="inherit">
                            <Badge badgeContent={itemCount} max={9} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        <Stack direction="row" >
                            {
                                authLinks.map(link =>
                                    <Button key={link.to} sx={navStyles} component={NavLink} to={link.to}>{link.title}</Button>
                                )
                            }
                        </Stack>
                    </Box>

                </Toolbar>
            </AppBar >
        </>
    );
}

export default Header