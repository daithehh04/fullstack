export const ProductDetail = ({data}) => {
  const { id } = data;
  return `
  <h1>Chi Tiết sản phẩm ${id}</h1>
  <button onclick="navigate('/product')">Back</button>
  `;
};