import { useEffect, useState } from 'react'
import { IProduct } from '../../model/IProduct';
import ProductList from './ProductList';
import requests from '../../api/request';
import { CircularProgress } from '@mui/material';

function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        requests.Catalog.list()
            .then(data => setProducts(data))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <CircularProgress />

    return (
        <ProductList products={products} />
    );
}

export default CatalogPage