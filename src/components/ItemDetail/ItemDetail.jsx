import ItemCount from "../ItemCount"
import { Slide, toast } from 'react-toastify'
import { useContext } from "react"
import { context } from '../../context/CartContext'
import { Button } from "../styled-components/Button"
import { Link } from "react-router-dom"

const ItemDetail = ({item}) => {

  const { addItem, isInCart } = useContext(context)

  const currencyFormat = new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'})

  function onAdd(count){
    addItem(item, count)
    toast.success(`Agregaste ${count} Juego${(count > 1) ? 's' : ''} de PC ${item.title} a tu carrito`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide
    })
  }

  return (
      <div className="itemDetail">
        <img src={item.imageUrl} alt={item.title}/>
        <div className="detail">
            <h2 className="detail__title">{item.title}</h2>
            <p className="detail__description">{item.description}</p>
            <p className="detail__origin">Origen: {item.origin}</p>
            <p className="detail__price">Precio: {currencyFormat.format(item.price)}</p>
            <div className="detail__counter">
              {
                isInCart(item.id)
                ? <Link to='/cart'>
                    <Button primary>Terminar Compra</Button>
                  </Link>
                : <ItemCount stock={item.stock} initial={1} onAdd={onAdd}/>
              }
            </div>
            <p className="detail__stock">Cantidad disponible: {item.stock}</p>
        </div>
      </div>
    )
}

export default ItemDetail
