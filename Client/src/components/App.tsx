import { useEffect, useState } from "react";
import { IProduct } from '../model/IProduct'
import Header from './Header'
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  //axios da kullanılabilir
  useEffect(() => {
    fetch("http://localhost:5018/api/products")
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
        {/* pageler degisken olarak gelir yani buraya gelecek olan page routea gore degisecek (Outlet) */}
      </Container>
    </>
  )
}
export default App
