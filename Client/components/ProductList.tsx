import { IProduct } from '../model/IProduct'
import Product from './Product'

interface Props {
    products: IProduct[],
    addProduct: () => void
}

function ProductList({ products, addProduct }: Props) {
    return (
        <>
            <h3>ProductList</h3>
            <ul>
                {
                    products.map((product: IProduct) => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </ul>
            <button onClick={addProduct}>Add Product</button>
        </>
    );
}
export default ProductList