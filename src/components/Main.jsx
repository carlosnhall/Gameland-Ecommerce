import { Routes, Route } from 'react-router-dom'
import ItemDetailContainer from './ItemDetail/ItemDetailContainer'
import ItemListContainer from './ItemList/ItemListContainer'
import Cart from '../components/cart/Cart'
import Checkout from './Checkout'
import TrackOrders from './TrackOrders'

const Main = () => {
  return (
    <Routes>
        <Route exact path="/" element={<ItemListContainer/>} />
        <Route path="/category/:idCategory" element={<ItemListContainer/>} />
        <Route path="/item/:idItem" element={<ItemDetailContainer/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/track" element={<TrackOrders/>} />
    </Routes>
  )
}

export default Main