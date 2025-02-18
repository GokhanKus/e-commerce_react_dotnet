import { useEffect, useState } from "react";
import { IProduct } from '../model/IProduct'
import Header from './Header'
import ProductList from './ProductList'

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
      <h1>React.js</h1>
      <Header products={products} />
      <ProductList products={products} addProduct={addProduct} />
    </>
  )
}
export default App
