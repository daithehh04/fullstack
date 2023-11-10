import React from 'react'
import { useDispatch } from '../core/hook'
import { toast } from 'react-toastify'

function ProductItem({product}) {
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    toast.success('Đã thêm 1 sản phẩm vào giỏ hàng')
    dispatch({
      type: 'cart/add',
      payload: product
    })
  }
  return (
    <div className='product-item'>
      <img src={product.image} alt="" className='thumb'/>
      <h3 className='name'>{product.name}</h3>
      <div className='price'>
        <p>${product.price}</p>
        <button onClick={handleAddToCart} className='button'>Add to cart</button>
      </div>
    </div>
  )
}

export default ProductItem