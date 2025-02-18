function App() {

  return (
    <>
      <h1>React.js</h1>
      <Header />
      <ProductList />
    </>
  )
}

function Header() {
  return (
    <h2>Header</h2>
  );
}

function ProductList() {
  return (
    <>
      <h3>ProductList</h3>
      <Product />
      <Product />
      <Product />
    </>
  );
}
function Product() {
  return (
    <h4>Product</h4>
  );
}

export default App
