import { AddShoppingCart } from "@mui/icons-material";
import { IProduct } from "../../model/IProduct";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router";
import { LoadingButton } from "@mui/lab";
import { currencyTRY } from "../../utilities/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart } from "../cart/cartSlice";

interface Props {
    product: IProduct
}

function Product({ product }: Props) {

    const { status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

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
                    loading={status === "pending" + product.id}//urunu sepete eklemek icin butona basarken sadece o itemda loading animasyon cıksın
                    onClick={() => dispatch(addItemToCart({ productId: product.id }))}>Add to cart</LoadingButton>

                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon />} color="primary">View</Button>
            </CardActions>
        </Card >
    );
}

export default Product