import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { context } from '../../context/CartContext'
import { CartItem } from './CartItem'
import { Button } from '../styled-components/Button'

const Cart = () => {

  const currencyFormat = new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'})

  const { cart, removeItem, clear, totalQuantityCalc, totalCartValueCalc } = useContext(context)

  return (
    <div className='cart'>
      {
        totalQuantityCalc() > 0
        ? <>
            <span>Carrito</span>
            <table className="cartTable">
              <thead className='cartHeaders'>
                <tr>
                  <td></td>
                  <td>Producto</td>
                  <td></td>
                  <td>Cantidad</td>
                  <td></td>
                  <td>Precio</td>
                  <td></td>
                  <td>Subtotal</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                { cart.map(item => <CartItem key={item.id} item={item} removeItem={removeItem}/>) }
              </tbody>
            </table>
            <span className='total'>Total de la compra: { currencyFormat.format(totalCartValueCalc()) }</span>
            <div className='cartButtons'>
              <Button primary className='cartButton' onClick={() => clear()}>Vaciar carrito</Button>
              <Link to='/checkout'>
                <Button primary className='cartButton'>Proceder a Checkout</Button>
              </Link>
            </div>
          </>
        : <>
            <h3>Tu carrito está vacío</h3>
            <Link to='/' className='linkToStore'>
              <Button primary>Volver a la tienda</Button>
            </Link>
          </>
      }
    </div>
  )
}

export default Cart