const products = [
  { id: 1, name: "Product 1", price: 10.99 },
  { id: 2, name: "Product 2", price: 19.99 },
];

const getProducts = (req, res) => {
  res.json(products);
};

export { getProducts };