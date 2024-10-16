import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { productList } from "./data";
import Button from "./components/ui/Button";


function App() {

  // ** States
  let [isOpen, setIsOpen] = useState(false)

  // ** Handler
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  // ** Renders
  const renderProductList = productList.map((item) => <ProductCard key={item.id} product={item} />)

  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={open}>ADD TASK</Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4 gap-4">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} close={close} title="ADD A NEW PRODUCT" >
        <div className="flex items-center space-x-4">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
          <Button className="bg-gray-300 hover:bg-gray-400">Cancel</Button>
        </div>
      </Modal>
    </main>
  )
}

export default App;
