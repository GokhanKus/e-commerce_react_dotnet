import { Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { IProduct } from "../../model/IProduct";

function ProductDetails() {
    const { id } = useParams(); //sayfaya gelen route parametresini almak icin use params kullaniriz
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5018/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <h5>Loading ...</h5>;
    if (!product) return <h5>Product not found </h5>;

    return (
        <Typography variant="h2">{product.name}</Typography>
    )
}

export default ProductDetails