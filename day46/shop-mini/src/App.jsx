import {Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import DefaultLayout from "./layouts/DefaultLayout";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          {routes.map((route, index) => {
            const Page = route.component;
            return  (
              <Route key={index} path={route.path} element={<Page />} />
            );
          })}
        </Route>
      </Routes>
      <ToastContainer pauseOnHover={false} autoClose={1500}/>
    </>
  )
}

export default App
