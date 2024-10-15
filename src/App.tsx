import ProductCard from "./components/ProductCard";
import { productList } from "./data";


function App() {
  // ** Renders
  const renderProductList = productList.map((item) => <ProductCard key={item.id} product={item} />)

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4 gap-4">
        {renderProductList}
      </div>
    </main>
  )
}

export default App;
