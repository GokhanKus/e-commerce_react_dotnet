import { useEffect, useState } from "react";
import { IProduct } from '../model/IProduct'
import Header from './Header'
import ProductList from './ProductList'
import { Container, CssBaseline } from "@mui/material";

function App() {
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
      <CssBaseline />
      <Header />
      <Container>
        <ProductList products={products} addProduct={addProduct} />
      </Container>
    </>
  )
}
export default App
