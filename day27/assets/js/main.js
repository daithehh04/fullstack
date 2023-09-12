const tableProducts = document.querySelector('.table-products')
const bodyProducts = tableProducts.querySelector('.table-products tbody')
const tableCart = document.querySelector('.table-cart')
const btnCart = document.querySelector('.btn-cart')

let carts = getLocalStorage() ? getLocalStorage() : [];
function getLocalStorage() {
  return JSON.parse(localStorage.getItem('carts'))
}
function setLocalStorage() {
    localStorage.setItem("carts", JSON.stringify(carts));
}
const products = [
  {
      id: 1,
      name: "Sản phẩm 1",
      price: 1000,
  },
  {
      id: 2,
      name: "Sản phẩm 2",
      price: 2000,
  },
  {
      id: 3,
      name: "Sản phẩm 3",
      price: 3000,
  },
  {
      id: 4,
      name: "Sản phẩm 4",
      price: 4000,
  },
];

function renderProduct() {
  const html = products.map((product,index) => (
    `<tr class=product-${index+1}>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>
          <input type="number" class="num-product" value="1" style="display: block;width: 96%; margin: 0 auto">
          <button class="add-cart" style = "width: 100%;">Thêm vào giỏ</button>
        </td>
      </tr>`
  )).join("")
  bodyProducts.innerHTML = html
}
renderProduct()

const btnAddCart = document.querySelectorAll('.add-cart')
const quantityProduct = document.querySelectorAll('.num-product')

btnAddCart.forEach((btn,index) => {
  btn.addEventListener('click',function() {
    const existProduct = carts.find(product => product.product_id === index + 1)
    if(+quantityProduct[index].value < 0) {
      quantityProduct[index].value = 1
    }
    if(existProduct) {
      existProduct.quantity = +existProduct.quantity +  +quantityProduct[index].value
      existProduct.total = existProduct.quantity * existProduct.price;
      renderCart()
    } else {
      const dataProduct = {
        product_id: index + 1,
        name: products[index].name,
        price: products[index].price,
        quantity: quantityProduct[index].value,
        total: 0,
      }
      carts.push(dataProduct);
      dataProduct.total = dataProduct.quantity *dataProduct.price;
      renderCart()
    }
    setLocalStorage()
    handleCart()
  })
})

const cartData = document.querySelector('.cart-data')
function renderCart() {
  if (!carts.length) {
      cartData.innerHTML = "Giỏ hàng không có sản phẩm";
  } else {
    cartData.innerHTML = "";
    cartData.append(tableCart)
  }
  const thead = `
      <tr>
          <th style="width: 5%;">STT</th>
          <th>Tên sản phẩm</th>
          <th style="width: 20%;">Giá</th>
          <th style="width: 20%;">Số lượng</th>
          <th style="width: 20%;">Thành tiền</th>
          <th style="width: 5%;">Xóa</th>
      </tr>`;
  tableCart.innerHTML = thead;
  carts.forEach((cart) => {
      const cartItem = document.createElement("tr");
      const html = `
          <td>${cart.product_id}</td>
          <td>${cart.name}</td>
          <td>${cart.price}</td>
          <td>
            <input type="number" value="${cart.quantity}" class="total-num"/>
          </td>
          <td>${cart.total}</td>
          <td>
              <button class="delete-product">Xóa</button>
          </td>`;
      cartItem.innerHTML = html;
      tableCart.appendChild(cartItem);
  });
  const total = document.createElement("tr");
  total.innerHTML = `
  <td colspan="3">Tổng</td>
  <td>${carts.reduce((total, product) => total + +product.quantity, 0)}</td>
  <td>${carts.reduce((total, product) => total + +product.total, 0)}</td>
  `;
  tableCart.appendChild(total);
  const deleteBtn = document.querySelectorAll(".delete-product");
    deleteBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        if (confirm("Are you sure?") === true) {
            carts.splice(index, 1);
            setLocalStorage()
            renderCart();
            handleCart()
            alert("Xóa sản phẩm thành công");
        }
    });
});
}
renderCart();

function handleCart() {
  if(!carts.length) {
    btnCart.innerHTML = ''
    return;
  } 
  const htmlBtn = `
  <hr>
  <button class="update_cart">Cập nhật giỏ hàng</button>
  <button class="delete_cart">Xóa giỏ hàng</button>
  `;
  btnCart.innerHTML = htmlBtn
  const updateCart = document.querySelector(".update_cart");
  const deleteAllCart = document.querySelector(".delete_cart");

  if(deleteAllCart) {
    deleteAllCart.addEventListener('click',function() {
      if (confirm("Are you sure?") === true) {
        carts.length = 0;
        renderCart();
        handleCart()
        setLocalStorage()
        alert("Xóa giỏ hàng thành công");
      }
    })
  }
  if(updateCart) {
    updateCart.addEventListener('click',function() {
      const totalNum = document.querySelectorAll('.total-num')
      totalNum.forEach((item,index) => {
        if (+item.value <= 0) {
          carts.length = 0
          renderCart();
          handleCart()
          setLocalStorage()
          alert("Cập nhật giỏ hàng thành công");
        } 
        carts[index].quantity = +item.value;
        carts[index].total = carts[index].quantity * carts[index].price;
        setLocalStorage()
      })
      renderCart()
      alert("Cập nhật giỏ hàng thành công");
    })
  }
}

handleCart()