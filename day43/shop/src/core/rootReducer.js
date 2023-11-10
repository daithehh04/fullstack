export const initialState = {
  products: JSON.parse(localStorage.getItem("cart")) || []
};
export const rootReducer = (state, action) => {
  switch (action.type) {
    case "cart/add": {
      const existProductIndex = state.products?.findIndex((product) => product._id === action.payload._id);
      const existProductItem = state.products[existProductIndex]
      let updateItems;
      if (existProductItem) {
        existProductItem.amount += 1;
        existProductItem.quantity -= 1;
        updateItems = [...state.products];
        const cartData = JSON.parse(localStorage.getItem("cart"));
        cartData[existProductIndex].amount = +cartData[existProductIndex].amount + 1;
        localStorage.setItem("cart", JSON.stringify(cartData));
      } else {
        const newProduct = { ...action.payload, amount: 1 };
        updateItems = [...state.products, newProduct];
        localStorage.setItem("cart", JSON.stringify(updateItems));
      }
      return {
        ...state,
        products: updateItems,
      };
    }
    case "cart/delete":
      localStorage.removeItem("cart");
      return {
        ...state,
        products: [],
      };
    default: {
      return state;
    }
  }
};