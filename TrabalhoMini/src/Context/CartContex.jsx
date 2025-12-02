import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export  function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    //Adiocionar item ao carrinho
    const addToCart = (product) =>{
        setCartItems((prev)=>{
            const existing = prev.find((item)=> item.id === product.id);
            if(existing){
                return prev.map((item) =>
                    item.id === product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
                );
            }
            return [...prev,{...product, quantity: 1}];
        });
    };
    //Aumentar quantidade
    const increaseQuantity = (id) =>{
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };
    //Diminuir quantidade
    const decreaseQuantity = (id) =>{
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                ? {...item, quantity: item.quantity - 1}
                : item
            )
            .filter((item) => item.quantity > 0)
        );
    }
    //Remover item do carrinho
    const removeFromCart = (id) =>{
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    //Limpar carrinho
    const clearCart = () =>{
        setCartItems([]);
    };
    return(
        <CartContext.Provider
        value={{
            cartItems,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
        }}
        >
            {children}      
        </CartContext.Provider>
        
    )
}
export function Cart() {
    return useContext(CartContext);
};