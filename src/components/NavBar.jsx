import CartWidget from "./CartWidget"
import { Link, NavLink } from 'react-router-dom'
import { useContext } from "react"
import { context } from '../context/CartContext'

const NavBar = () => {

    const { totalQuantityCalc } = useContext(context)

    return (
        <header>
            <div className="brand">
                <Link to="/">Gameland</Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/category/accion" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>Acción</NavLink>
                    </li>
                    <li>
                        <NavLink to="/category/aventura" className="nav__link">Aventura</NavLink>
                    </li>
                    <li>
                        <NavLink to="/category/estrategia" className="nav__link">Estrategia</NavLink>
                    </li>
                    <li>
                        <NavLink to="/category/rpg" className="nav__link">Rpg</NavLink>
                    </li>
                    <li>
                        <NavLink to="/track" className="nav__link">Seguimiento de compras</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" className="nav__link cartWidgetContainer">
                            <CartWidget className='cartWidget'/>
                            { totalQuantityCalc() > 0 && <p className="cartCounter">{ totalQuantityCalc() }</p> }
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar
