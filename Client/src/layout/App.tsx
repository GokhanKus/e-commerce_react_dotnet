import { useEffect, useState } from 'react';
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from '../store/store';
import { getCart } from '../features/cart/cartSlice';
import { getUser } from '../features/account/accountSlice';
import Header from './Header';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCart());
  }

  useEffect(() => {
    initApp().then(() => setLoading(false));
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
