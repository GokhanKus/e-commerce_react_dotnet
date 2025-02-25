import { AddShoppingCart } from "@mui/icons-material";
import { IProduct } from "../../model/IProduct";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router";
import { useState } from "react";
import requests from "../../api/request";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utilities/formatCurrency";
import { useAppDispatch } from "../../hooks/hooks";
import { setCart } from "../cart/cartSlice";

interface Props {
    product: IProduct
}

function Product({ product }: Props) {

    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const handleAddItem = (productId: number) => {

        setLoading(true);
        requests.Cart.addItem(productId)
            .then(cart => {
                dispatch(setCart(cart));
                toast.success("added to your basket");
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    return (
        <Card>
            <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`http://localhost:5018/images/${product.imageUrl}`} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="textSecondary"> {product.name} </Typography>
                <Typography variant="body2" color="secondary">{currencyTRY.format(product.price)}</Typography>
            </CardContent>
            <CardActions>

                {/* <Button variant="outlined" size="small" startIcon={<AddShoppingCart />} color="success"
                    onClick={() => handleAddItem(product.id)}> Add to cart</Button> */}

                <LoadingButton
                    size="small"
                    variant="outlined"
                    color="success"
                    loadingPosition="start"
                    startIcon={<AddShoppingCart />}
                    loading={loading}
                    onClick={() => handleAddItem(product.id)}>Add to cart</LoadingButton>

                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon />} color="primary">View</Button>
            </CardActions>
        </Card >
    );
}

export default Product