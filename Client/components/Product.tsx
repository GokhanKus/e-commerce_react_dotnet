import { IProduct } from "../model/IProduct";

interface Props {
    product: IProduct
}

function Product({ product }: Props) {
    return (
        <>
            {
                product.isActive &&
                <li>{product.name} {product.price}</li>
            }
        </>
    );
}

export default Product