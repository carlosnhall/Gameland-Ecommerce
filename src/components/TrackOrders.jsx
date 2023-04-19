import { useEffect, useState } from "react"
import { Button } from "./styled-components/Button"
import { getOrderById } from "../resources/Firebase"
import Lottie from 'lottie-react'
import Loading from '../assets/loading.json'
import { TrackOrdersItem } from "./TrackOrdersItem"

const TrackOrders = () => {

  const currencyFormat = new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'})

  const options = {
    animationData: Loading,
    autoplay: true,
    loop: false,
    style: {
      width: '20%'
    }
  }

  const [orderId, setOrderId] = useState()
  const [failed, setFailed] = useState(false)
  const [order, setOrder] = useState()
  const [orderStatus, setOrderStatus] = useState()
  const [trackingOrder, setTrackingOrder] = useState(false)

  const handleReTrack = () => {
    setOrderId()
    setOrder()
  }

  const handleOrderQuery = () => {
    setFailed(false)
    setTrackingOrder(true)
    getOrderById(orderId)
    .then(res => {
      setOrder(res)
      res === undefined && setFailed(true)
    })
    .finally(() => setTrackingOrder(false))
  }

  useEffect(() => {
    order !== undefined && setOrderStatus(`¡Hola ${order.buyer?.name}!, hemos encontrado tu órden! ¡Está próxima a ser despachada! El tiempo estimado de arribo es 3 días.`)
  }, [order])

  return (
    <div className="mainContainer">
      {
        order === undefined
        ? trackingOrder
          ? <>
              <div className='loader'>Buscando compra...<Lottie {...options} /></div>
            </>
          : <>
              <h2 className={!failed ? "greeting" : 'greeting error'}>{failed ? 'La órden ingresada no existe. ¡Por favor, revisa que la información sea correcta y vuelve a intentarlo!' : 'Introduce tu id de orden para realizar su seguimiento'}</h2>
              <form className="formContainer">
                <div className="formGroup">
                  <label htmlFor="id">ID</label>
                  <input className="orderInput" type="text" onChange={ (e) => setOrderId(e.target.value) }/>
                  <div className="trackButtonsContainer">
                    <Button primary type="submit" onClick={(e) => {
                        e.preventDefault()
                        handleOrderQuery()
                      }
                    }>
                      Buscar orden
                    </Button>
                  </div>
                </div>
              </form>
            </>
        : <div className="trackedOrder">
            <h2>Estado de la compra: <strong>{ orderId }</strong></h2>
            <h3 className='trackerMessage'>{ orderStatus }</h3>
            <table className="orderTable">
              <thead className='orderHeaders'>
                <tr>
                  <td></td>
                  <td>Producto</td>
                  <td></td>
                  <td>Cantidad</td>
                  <td></td>
                  <td>Precio</td>
                  <td></td>
                  <td>Subtotal</td>
                </tr>
              </thead>
              <tbody>
                { order.items?.map(item => <TrackOrdersItem key={item.id} item={item} />) }
              </tbody>
            </table>
            <h3 className="trackTotal">El total de la compra fué { currencyFormat.format(order.total) }</h3>
            <Button primary onClick={() => handleReTrack()}>Trackear otra órden</Button>
          </div>
      }
    </div>
  )
}

export default TrackOrders