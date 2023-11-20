import { NavLink } from "react-router-dom"
import ShoppingIcon from "../../assets/icons/ShoppingIcon"
import './Header.scss'
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
function Header() {
  const [amount, setAmount] = useState(0);
  const cart = useSelector(state => state.cart.cart)
  useEffect(() => {
    const totalAmount = cart.reduce(
      (acc, current) => acc + +current.amount,
      0
    );
    setAmount(totalAmount)
  }, [cart]);
  return (
    <header className="header">
      <NavLink to={'/'} className="home">Home</NavLink>
      <NavLink to={'/cart'} className="cart-icon">
        <ShoppingIcon/>
        <div className="badge">{amount}</div>
      </NavLink>
    </header>
  )
}

export default Header