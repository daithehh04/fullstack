import { router } from "./Utils/router";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Products } from "./Pages/Products";
import { ProductDetail } from "./Pages/ProductDetail";
import { DefaultLayout } from "./Layout/Default";

export const App = () => {
  return router(
    [
      { path: "/", component: Home },
      { path: "/about", component: About },
      { path: "/product", component: Products },
      { path: "/product/:id", component: ProductDetail },
    ],
    DefaultLayout
  );
};