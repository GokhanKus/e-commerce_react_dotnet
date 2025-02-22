import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Router.tsx'
import CartContextProvider from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <CartContextProvider>
    <RouterProvider router={router} />
  </CartContextProvider>
)
