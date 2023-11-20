/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import CartIcon from "../../assets/icons/CartIcon"
import "./ProductItem.scss"
import { useDispatch } from "react-redux";
import { add } from "../../stores/slices/productSlice";
import { toast } from 'react-toastify';

function ProductItem({product}) {
  const {name,image,price,_id} = product
  const dispatch = useDispatch()
  const handleAddCart = () => {
    dispatch(add(product))
    toast.info('Đã thêm sản phẩm vào giỏ hàng')
  }
  return (
    <div className="product-item">
      <NavLink to={`/detail/${_id}`}>
        <div className="thumb">
          <img src={image} alt="" />
        </div>
        <h3 className="name">{name}</h3>
      </NavLink>
      <div className="info">
        <span className="price">${price}</span>
        <div className="cart-icon" onClick={handleAddCart}><CartIcon/></div>
      </div>
    </div>
  )
}

export default ProductItem