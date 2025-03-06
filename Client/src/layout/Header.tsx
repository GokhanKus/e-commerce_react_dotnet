import { KeyboardArrowDown, ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../features/account/accountSlice';
import { useAppSelector } from '../store/store';
import { clearCart } from '../features/cart/cartSlice';
import { useState } from 'react';

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
    const { user } = useAppSelector(state => state.account);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0);
    return (
        <>
            <AppBar sx={{ mb: 4 }} position="static">
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>

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
                            {
                                user ?
                                    (
                                        <>
                                            <Button id="user-button" onClick={handleMenuClick} endIcon={<KeyboardArrowDown />} sx={navStyles}>{user.name}</Button>

                                            <Menu id="user-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                                                <MenuItem component={Link} to="/orders">Orders</MenuItem>
                                                <MenuItem onClick={() => {
                                                    dispatch(logout())
                                                    dispatch(clearCart())
                                                }}>Logout</MenuItem>
                                            </Menu>
                                        </>
                                    ) :
                                    (
                                        <Stack direction="row" >
                                            {
                                                authLinks.map(link =>
                                                    <Button key={link.to} sx={navStyles} component={NavLink} to={link.to}>{link.title}</Button>
                                                )
                                            }
                                        </Stack>
                                    )
                            }

                        </Box>

                    </Toolbar>
                </Container>
            </AppBar >
        </>
    );
}

export default Header