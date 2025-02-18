import { IProduct } from "../model/IProduct";

interface Props {
    product: IProduct
}

function Product({ product }: Props) {
    return (
        <>
            <div>
                <h3> {product.name} </h3>
                <p> {product.price} </p>
            </div>
        </>
    );
}

export default Product