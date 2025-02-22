import { useEffect, useState } from 'react';
import Header from './Header'
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import requests from '../api/request';
import { useCartContext } from '../context/CartContext';

function App() {

  const [loading, setLoading] = useState(true);
  const { setCart } = useCartContext();

  useEffect(() => {
    requests.Cart.get()
      .then(cart => setCart(cart))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [])

  if (loading) return <CircularProgress />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme="colored" />
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
