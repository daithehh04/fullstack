import { Link, useNavigate, useParams } from "react-router-dom"
import "./ProductDetail.scss"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { add } from "../../stores/slices/productSlice"
import { toast } from "react-toastify"
import { fetchProductDetail } from "../../stores/middlewares/productMiddleware"
import Loading from "../../components/Loading/Loading";
function ProductDetail() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(state => state.cart.statusProductDetail)
  useEffect(() => {
    dispatch(fetchProductDetail(id))
  },[id])
  const productDetail = useSelector(state => state.cart.productDetail)
  const handleAddCart = (product) => {
    dispatch(add(product))
    toast.success('Thêm sản phẩm thành công')
  }
  if(status === 'pending') {
    return <Loading />
  }
  if(!productDetail) {
    navigate('/')
  }
  return (
    <div className="product-detail">
      <img src={productDetail?.image} alt="" className="thumb"/>
      <div className="info">
        <h2 className="brand">{productDetail?.brand}</h2>
        <h3 className="name">{productDetail?.name}</h3>
        <p className="desc">{productDetail?.description}</p>
        <div className="block">
          <p className="category">Category: {productDetail?.category}</p>
          <span className="price">${productDetail?.price?.toLocaleString()}</span>
        </div>
        <div className="btn-group">
          <Link to={'/'} className="btn">Go home</Link>
          <button className="btn" onClick={() => handleAddCart(productDetail)}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail