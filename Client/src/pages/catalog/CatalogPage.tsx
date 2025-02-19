import { useEffect, useState } from 'react'
import { IProduct } from '../../model/IProduct';
import ProductList from './ProductList';

function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);

    //axios da kullanılabilir
    useEffect(() => {
        fetch("http://localhost:5018/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [])

    return (
        <ProductList products={products} />
    );
}

export default CatalogPage