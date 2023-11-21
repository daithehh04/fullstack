import { useEffect, useRef, useState } from "react"
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';
import ProductItem from "../../components/ProductItem/ProductItem"
import { useNavigate, useLocation } from "react-router-dom";
import "./Products.scss"
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../stores/middlewares/productMiddleware";
import Loading from "../../components/Loading/Loading";
function Products() {
  // const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
// Lấy giá trị của tham số 'page'
  let pageValue = searchParams.get('page');
  const queryRef = useRef({
    page: 1,
    limit: 20
  });
  const dispatch = useDispatch()
  const listProduct = useSelector(state => state.cart.products)
  const totalPage = useSelector(state => state.cart.totalPage)
  const status = useSelector(state => state.cart.statusProduct)
  if(+pageValue < 1 || +pageValue > totalPage) {
    pageValue = 1
  }
  useEffect(() => {
    const newQuery = { ...queryRef.current, page: pageValue };
    queryRef.current = newQuery;
    const params = queryRef.current
    dispatch(fetchProducts(params))
    if (
      isNaN(+pageValue)
    ) {
      navigate("/products?page=1");
    }
  },[pageValue])
  // const itemsPerPage = 20
  useEffect(() => {
    // const endOffset = itemOffset + itemsPerPage;
    // setCurrentItems(listProduct.slice(itemOffset, endOffset));
    setPageCount(totalPage);
  }, [totalPage]);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    // setItemOffset(event.selected * itemsPerPage);
    const queryParams = { page: selectedPage };
    const searchString = queryString.stringify(queryParams);
    navigate(`/products?${searchString}`);
    window.scroll({
      top: 0,
    });
  };
  return (
    <div className="products">
      <h2 className="title">Products</h2>
      {status === 'pending' ? <Loading/> : (
        <>
          <div className="list-product">
        {
          listProduct.map((product,index) => (
            <ProductItem key={index} product={product}/>
          ))
        }
        </div>
        <ReactPaginate
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        initialPage={+pageValue - 1}
        />
        </>
      )}
      
    </div>
  )
}

export default Products