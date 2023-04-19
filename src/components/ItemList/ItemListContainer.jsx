import { useState, useEffect} from 'react'
import ItemList from "./ItemList"
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Lottie from 'lottie-react'
import Loading from '../../assets/loading.json'
import { getItems, getItemsByCategory } from '../../resources/Firebase'

const saludo = "The best PC games store in the www | Only for Gamers |  La mejor página web de juegos en toda la red"

const options = {
  animationData: Loading,
  autoplay: true,
  loop: false,
  style: {
    width: '20%'
  }
}

const ItemListContainer = () => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { idCategory } = useParams()

  useEffect(() => {
    setLoading(true)
    if (idCategory) {
      getItemsByCategory(idCategory)
      .then((items) => {setItems(items)})
      .catch(() => {toast.error("Error while loading products!")})
      .finally(() => {setLoading(false)})
    } else {
      getItems()
      .then((items) => {setItems(items)})
      .catch(() => {toast.error("Error while loading products!")})
      .finally(() => {setLoading(false)})
    }
  }, [idCategory])

  return (
    <div className="mainContainer">
      {
        loading
        ? <div className='loader'>Loading...<Lottie {...options} /></div>
        : <>
            <h2 className="greeting">{saludo}</h2>
            <img className="landingImage" alt="landing banner" src="/assets/images/landing.jpg"/>
            <ItemList items={items}/>
          </>
      }
    </div>
  )
}

export default ItemListContainer