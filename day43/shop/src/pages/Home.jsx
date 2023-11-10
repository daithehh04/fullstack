import { toast, ToastContainer } from 'react-toastify';
import Loading from "../components/Loading";
import { useEffect, useState } from 'react';
import Login from '../components/Login';
import getProducts from '../api/getProducts';
import ProductItem from '../components/ProductItem';
import TableCart from '../components/TableCart';
import getProfile from '../api/getProfile';

function Home() {
  const [loading,setLoading] = useState(false)
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [products,setProducts] = useState([])

  const getAllProducts = async () => {
    setLoading(true)
    const data = await getProducts();
    setProducts(data)
    setLoading(false)
  }
  useEffect(() => {
    getAllProducts()
  },[])
  useEffect(() => {
    if(apiKey) {
      getProfile()
        .then((res) => {
          if (res.code === 200) {
            toast.success(`Chào mừng ${res.data.emailId.name} quay trở lại`);
          } else {
            toast.warn(res.message);
            localStorage.removeItem("apiKey");
            localStorage.removeItem("email");
          }
        })
    } 
  }, []);
  return (
    <div className="app">
      {!apiKey && <Login setLoading={setLoading} setApiKey={setApiKey}/>}
      <div className="container">
        <h1 className="title">Welcome to shop!</h1>
        <div className='list-product'>
        {products.map((product,index) => (
          <ProductItem key={product._id} product={product}/>
        ))}
        </div>
        <TableCart setLoading={setLoading}/>
      </div>
      {loading && <Loading/>}
      <ToastContainer autoClose={3000}/>
    </div>
  )
}
export default Home