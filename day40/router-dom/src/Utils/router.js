import Navigo from "navigo";
import { Error } from "../Error";

const root = document.querySelector("#app");

const routerNavigo = new Navigo("/", { linksSelector: "a" });
window.navigate = (path) => routerNavigo.navigate(path);

const renderRouter = (content, target, params) => {
  target.innerHTML = content(params);
};

export function router(arrRouter, DefaultLayout) {
  if (DefaultLayout) {
    renderRouter(DefaultLayout, root);
  }
  const body = document.querySelector(".body");
  arrRouter.forEach((route) => {
    routerNavigo.on(route.path, (params) => {
      renderRouter(route.component, body, params);
    });
  });
  routerNavigo.notFound(() => renderRouter(Error, root))
  routerNavigo.resolve();
}
