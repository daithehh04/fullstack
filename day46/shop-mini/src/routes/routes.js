import Cart from "../pages/Cart/Cart";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Products from "../pages/Products/Products";

export const routes = [
  { path: "/products", component: Products },
  { path: "/detail/:id", component: ProductDetail },
  { path: "/cart", component: Cart },
  { path: "*", component: Products },
]