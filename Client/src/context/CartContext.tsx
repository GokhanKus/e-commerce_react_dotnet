import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ICart } from '../model/ICart'

interface CartContextValue {
    cart: ICart | null,
    setCart: (cart: ICart) => void,
    deleteItem: (productId: number, quantity: number) => void
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined)
        throw new Error("no provider");
    return context;
}

function CartContextProvider({ children }: PropsWithChildren) {
    const [cart, setCart] = useState<ICart | null>(null);

    const deleteItem = (productId: number, quantity: number) => {

    }

    return (
        <CartContext.Provider value={{ cart, setCart, deleteItem }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider