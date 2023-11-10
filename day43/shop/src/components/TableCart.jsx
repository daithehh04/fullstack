import React from 'react'
import {useDispatch, useSelector } from '../core/hook'
import { client } from '../config/client'
import { toast } from 'react-toastify'

function TableCart({setLoading}) {
  const {products} = useSelector()
  const dispatch = useDispatch()
  const handlePay = async () => { 
    const body = []
    products.forEach((product) => {
      body.push({
        productId: product._id,
        quantity: product.amount
      })
    })
    setLoading(true)
    const {data,response} = await client.post("/orders",body,localStorage.getItem("apiKey"))
    setLoading(false)
    console.log(response);
    if(response.ok) {
      dispatch({
        type: "cart/delete"
      })
      toast.info('Đã thanh toán')
    } else {
      toast.warn(response.message)
    }
  }
  return (
    <div>
      <table className='table-cart'>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Còn lại</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product,index) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.amount}</td>
              <td>{product.quantity}</td>
              <td>{product.amount * product.price}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <button className='button' onClick={handlePay}>Thanh toán</button>
    </div>
  )
}

export default TableCart