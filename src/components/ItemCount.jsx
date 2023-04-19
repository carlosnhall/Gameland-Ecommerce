import { useState } from 'react'
import { Button } from './styled-components/Button'

const ItemCount = ({stock, initial = 1, onAdd}) => {

    const [count, setCount] = useState(initial)

    function increment(){
        count < stock && setCount(count + 1);
    }

    function decrement(){
        count > 1 && setCount(count - 1);
    }

    return (
        <div className="itemCount">
            <div>
                <Button onClick={decrement}>-</Button>
                <p>{count}</p>
                <Button onClick={increment}>+</Button>
            </div>
            <Button primary onClick={() => onAdd(count)} className="addToCart">Agregar al carrito</Button>
        </div>
    )
}

export default ItemCount