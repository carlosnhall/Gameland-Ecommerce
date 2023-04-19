import { Trash } from 'react-bootstrap-icons'

export const CartItem = ({ item, removeItem }) => {

  const currencyFormat = new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'})

  return (
    <tr className="cartItem">
      <td>
          <img className='cartImage' src={item.imageUrl} alt={item.title}/>
      </td>
      <td>
        <p>{item.title}</p>
      </td>
      <td>
        <p>Game{item.count > 1 ? 's' : ''}</p>
      </td>
      <td>
        {item.count}
      </td>
      <td>
        X
      </td>
      <td>
        {currencyFormat.format(item.price)}
      </td>
      <td>
        =
      </td>
      <td>
        <p>{ currencyFormat.format(item.price * item.count) }</p>
      </td>
      <td>
        <Trash className='trash' onClick={() => removeItem(item.id)} />
      </td>
    </tr>
  )
}
