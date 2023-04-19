import { useContext, useState } from "react"
import { context } from "../context/CartContext"
import { submitOrder } from "../resources/Firebase"
import { Button } from "./styled-components/Button"
import { Link } from "react-router-dom"

const Checkout = () => {

  const { cart, totalCartValueCalc, clear } = useContext(context)
  const [orderId, setOrderId] = useState()
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [adress, setAdress] = useState()

  const handleSubmit = () => {
    const currentOrder = {
      buyer: {
        name: name,
        surname: surname,
        phone: phone,
        email: email,
        adress: adress
      },
      items: [...cart],
      total: totalCartValueCalc()
    }
    submitOrder(currentOrder).then(res => setOrderId(res))
    clear()
  }

  return (
    <div className="mainContainer">
      {
        orderId
        ? <>
            <h2 className="greeting">¡Gracias por tu compra!</h2>
            <p className="checkoutInfo">Tu número de órden es: <strong>{ orderId }</strong></p>
            <p className="checkoutInfo">Consérvalo para realizar su seguimiento.</p>
            <Link to='/' className='linkToStore'>
              <Button primary>Te invitamos a continuar viendo nuestro catálogo</Button>
            </Link>
          </>
        : <>
            <h2 className="greeting">Introduce tus datos para finalizar tu compra</h2>
            <form className="formContainer">
              <div className="formGroup">
                <label className="formLabel" htmlFor="name">Nombre</label>
                <input className="formInput" type="text" id="name" onChange={ (e) => setName(e.target.value) }/>
                <label className="formLabel" htmlFor="name">Apellido</label>
                <input className="formInput" type="text" id="surname" onChange={ (e) => setSurname(e.target.value) }/>
                <label className="formLabel" htmlFor="email">Email</label>
                <input className="formInput" type="email" id="email" onChange={ (e) => setEmail(e.target.value) }/>
                <label className="formLabel" htmlFor="phone">Teléfono</label>
                <input className="formInput" type="tel" id="phone" onChange={ (e) => setPhone(e.target.value) }/>
                <label className="formLabel" htmlFor="name">Dirección</label>
                <input className="formInput" type="text" id="adress" onChange={ (e) => setAdress(e.target.value) }/>
                <Button primary className="orderSubmit" type="submit" onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }
                }>
                  Enviar orden de compra
                </Button>
              </div>
            </form>
          </>
      }
    </div>
  )
}

export default Checkout