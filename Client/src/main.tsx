import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Router.tsx'
import CartContextProvider from './context/CartContext.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </Provider>
)
