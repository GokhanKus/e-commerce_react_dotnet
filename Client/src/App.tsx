const products = [
  { id: 1, name: "Bilgisayar", price: 24000, isActive: true },
  { id: 2, name: "Klavye", price: 2400, isActive: false },
  { id: 3, name: "Camera", price: 2000, isActive: true },
  { id: 4, name: "Keyboard", price: 4000, isActive: true },
  { id: 5, name: "Mouse", price: 300, isActive: false },
]

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
      {
        products.map(product => (
          <ul>
            <Product key={product.id} product={product} />
          </ul>
        ))
      }
    </>
  );
}
function Product(props: any) {

  return (
    <>
      {
        props.product.isActive &&
        <li>{props.product.name} {props.product.price}</li>
      }
    </>
  );
}

export default App
