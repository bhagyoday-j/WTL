import Footer from "./Footer"
import Header from "./Header"
import Product from "./Product"


function App() {


  return (
    <div>
      <Header name = "Bhagyoday Jadhav"></Header>
      <div>
        <h2>Our Products</h2>
        <Product pname = "Mobile"></Product>
        <Product pname = "Laptop"></Product>
        <Product pname = "Book"></Product>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
