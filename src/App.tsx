import ProductCard from "./components/ProductCard";
import { productList } from "./data";


function App() {
  // ** Renders
  const renderProductList = productList.map((item) => <ProductCard key={item.id} product={item} />)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 m-4 gap-4">
      {renderProductList}
    </div>
  )
}

export default App;
