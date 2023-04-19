import { createContext, useState } from 'react'

export const context = createContext()
const { Provider } = context

const MyProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const isInCart = (id) => {
        return cart.some(item => item.id === id)
    }

    const addItem = (item, count) => {
        const cartCopy = [...cart]
        const itemToCart = { ...item, count }

        isInCart(item.id)
        ? cartCopy[cartCopy.findIndex(obj => obj.id === item.id)].count += count
        : cartCopy.push(itemToCart)

        setCart(cartCopy)
    }


    const removeItem = (id) => {
        const cartCopy = [...cart]
        let index = cartCopy.findIndex(item => item.id === id)
        cartCopy.splice(index, 1)
        setCart(cartCopy)
    }

    const clear = () => {
        setCart([])
    }

    const totalQuantityCalc = () => {
        let totalQuantity = 0
        cart.forEach(item => totalQuantity += item.count)
        return totalQuantity
    }

    const totalCartValueCalc = () => {
        let totalCartValue = 0
        cart.forEach(item => totalCartValue += (item.count * item.price))
        return totalCartValue
    }

    const contextValue = {
        cart: cart,
        isInCart: isInCart,
        addItem: addItem,
        removeItem: removeItem,
        clear: clear,
        totalQuantityCalc: totalQuantityCalc,
        totalCartValueCalc: totalCartValueCalc
    }

    return (
        <Provider value={ contextValue }>
            { children }
        </Provider>
    )
}

export default MyProvider