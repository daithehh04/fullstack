import {useDispatch, useSelector } from "react-redux"
import DeleteIcon from "../../assets/icons/DeleteIcon";
import "./Cart.scss"
import { Link } from "react-router-dom";
import { add, decrease, delete_cart } from "../../stores/slices/productSlice";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import FaceIcon from "../../assets/icons/FaceIcon";
import ModalConFirm from "../../components/Modal/ModalConfirm";
function Cart() {
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartRemove,setCartRemove] = useState(null)
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const pice = cart.reduce(
      (acc, current) => acc + +current.amount* +current.price,
      0
    );
    setTotalPrice(pice)
  }, [cart]);
  useEffect(() => {
    window.scroll(0,0)
  },[])
  const handleIncreaseCart = (product) => {
    dispatch(add(product))
    toast.success('Đã thêm 1 sản phẩm')
  }
  const handleDecreaseCart = (product) => {
    if(product.amount === 1) {
      setIsOpen(true);
      setCartRemove(product)
    } else {
      dispatch(decrease(product))
      toast.success('Đã giảm 1 sản phẩm')
    }
  }
  const handleRemoveCart = (product) => {
    setIsOpen(true);
    setCartRemove(product)
  }

  const handleCheckout = () => {
    dispatch(delete_cart())
    toast.success('Thank you! You have successfully paid.')
  }
  return (
    <div className="cart">
      <h2 className="title">Shopping Cart</h2>
      {!cart.length ? (
        <div className="no-cart">
          <div className="icon">
            <FaceIcon/>
          </div>
          <h3>There is no product in your cart !!</h3>
          <Link to={'/'} className="btn">Buy now</Link>
        </div>
      ): (
        <div className="cart-wrapper">
          <div className="checkout">
            <p className="total-price">
              Total: ${totalPrice}
            </p>
            <button onClick={handleCheckout}>Check out</button>
            <Link to={'/'} className="link-home">Home</Link>
          </div>
          <div className="list-cart">
            {cart.map((product,index) => (
            <div key={index} className="cart-item">
              <div>
                <Link to={`/detail/${product._id}`} className="link-item">
                  <img src={product.image} alt="" className="thumb"/>
                </Link>
                <div className="actions">
                  <button onClick={() => handleDecreaseCart(product)} className={`${+product.amount === 1 ? 'disable' : ''}`}>-</button>
                  <span>{product.amount}</span>
                  <button onClick={() => handleIncreaseCart(product)}>+</button>
                </div>
              </div>
              <div className="info">
                <h2 className="brand">{product.brand}</h2>
                <h3 className="name">{product.name}</h3>
                <span className="price">${product.price}</span>
                <p className="quantity">Còn lại: {product.quantity}</p>
                <div className="block">
                  <p className="total">${product.amount * product.price}</p>
                  <div className="delete-icon" onClick={() => handleRemoveCart(product)}>
                    <DeleteIcon />
                  </div>
                </div>
              </div>
              
            </div>
          ))}
          </div>
        </div>
      )}
      <ModalConFirm isOpen={isOpen} product={cartRemove} onClose={handleCloseModal}/>
    </div>
  )
}

export default Cart