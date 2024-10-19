import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import { Input } from "@headlessui/react";
import { IProduct } from "./Interfaces";
import { productValidation } from "./validation";


function App() {

  const defaultProductObj = {  // to make the input is empty
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    }
  }

  // ** States ** //
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProductObj)

  // ** Handler ** //
  const open = () => setIsOpen(true)

  const close = () => setIsOpen(false)

  const onChagneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    })
  };

  // TO close the modle and empty the inputs
  const onCancel = () => {
    setProduct(defaultProductObj);
    close();  // OR if you have many conditions make the state = false ==> setIsOpen(false)
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = productValidation({title: product.title, description: product.description, imageURL: product.imageURL, price: product.price});
    console.log(errors);
  }

  // ** Renders ** //
  const renderProductList = productList.map((item) => <ProductCard key={item.id} product={item} />)

  const renderFormInputList = formInputsList.map((input) =>
    <div key={input.id} className="flex flex-col">
      <label htmlFor={input.id} className="font-medium text-sm text-gray-700 mb-[2px]">{input.label}</label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChagneHandler}
        className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg text-lg p-3"
      />
    </div>)

  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={open}>ADD TASK</Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4 gap-4">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} close={close} title="ADD A NEW PRODUCT" >
        <form className="space-y-3" onSubmit={onSubmitHandler}>
          {renderFormInputList}
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App;
