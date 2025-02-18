import { useEffect, useState } from "react";
import { IProduct } from '../model/IProduct'

const productList = [
  { id: 1, name: "Bilgisayar", price: 24000, isActive: true },
  { id: 2, name: "Klavye", price: 2400, isActive: false },
  { id: 3, name: "Camera", price: 2000, isActive: true },
  { id: 4, name: "Keyboard", price: 4000, isActive: true },
  { id: 5, name: "Mouse", price: 300, isActive: false },
]

function App() {

  return (
    <>
      <h1>React.js</h1>
      <Header />
      <ProductList />
    </>
  )
}

function Header() {
  return (
    <h2>Header</h2>
  );
}

function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);

  //axios da kullanılabilir
  useEffect(() => {
    fetch("http://localhost:5018/api/products")
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])

  const addProduct = () => {
    setProducts([...products,
    {
      id: Math.floor(Math.random() * 99999),
      name: "NewProduct",
      stock: 24,
      price: Math.floor(Math.random() * 999999),
      isActive: true
    }])
  }

  return (
    <>
      <h3>ProductList</h3>
      <ul>
        {
          products.map(product => (
            <Product key={product.id} product={product} />
          ))
        }
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </>
  );
}

function Product(props: any) {

  return (
    <>
      {
        props.product.isActive &&
        <li>{props.product.name} {props.product.price}</li>
      }
    </>
  );
}

export default App
