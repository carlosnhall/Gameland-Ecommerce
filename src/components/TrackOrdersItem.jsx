export const TrackOrdersItem = ({ item }) => {

    const currencyFormat = new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'})

    return (
      <tr className="orderItem">
        <td>
            <img className='orderImage' src={item.imageUrl} alt={item.title}/>
        </td>
        <td>
          <p>{item.title}</p>
        </td>
        <td>
          <p>Juego{item.count > 1 ? 's' : ''} de PC</p>
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
      </tr>
    )
}
