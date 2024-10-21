import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import { Input } from "@headlessui/react";
import { IProduct } from "./Interfaces";
import { productValidation } from "./validation";
import ErrorMassege from "./components/ErrorMassege";
import CicleColor from "./components/CicleColor";
import { v4 as uuid } from "uuid";


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
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [tempColor, setTemColor] = useState<string[]>([]);
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" }); // Save Error Msg IN This State 
  const [products, setProducts] = useState<IProduct[]>(productList); // عملت الاستيت دي عشان اعرف اضيف علي الداتا لان الداتا كنت عاملها امبورت من الملف علي طول


  // ** Handler ** //
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const onChagneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    // to empty the validation when we write in the current input
    setErrors({
      ...errors,
      [name]: "",
    })
  };

  // TO close the modal and empty the inputs
  const onCancel = () => {
    setProduct(defaultProductObj);
    close();  // OR if you have many conditions make the state = false ==> setIsOpen(false)
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Destructuring Product IN ES6 When we write title: title THIS equal to title 
    const { title, description, imageURL, price } = product;
    /*

      title: title,
      description: description,
      imageURL: imageURL,
      price: price

      TOP is equal to BOTTOM

      title,
      description,
      imageURL,
      price

    */
    const errors = productValidation({ title, description, imageURL, price });
    console.log(errors);

    // Handling the value of inputs 
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");
    if (!hasErrorMsg) {
      // save the error msg in this state 
      setErrors(errors);
      return;
    }
    // بدل م كنت بتبعت رساله لا دلوقتي اعملي ست ل ال برودكت و ابعت ال اي دي و ال كلرز
    setProducts((prev) => [{ ...product, id: uuid(), colors: tempColor }, ...prev]);
    setProduct(defaultProductObj); // To empty the inputs
    setTemColor([]);               // To clear the circle color
    close();                       // To close the modal
  }

  // ** Renders ** //
  const renderProductList = products.map((item) => <ProductCard key={item.id} product={item} />)

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
      {/* Render the Error Msg Blow the Input */}
      <ErrorMassege msg={errors[input.name]} />
    </div>)

  // Map on circle colors
  const renderProductColor = colors.map(color => <CicleColor color={color} key={color} onClick={() => {
    if (tempColor.includes(color)) {
      // Toggle the color
      setTemColor(prev => prev.filter(item => item !== color))
      return;
    }
    // Adding the color and prev color
    setTemColor((prev) => [...prev, color])
  }} />);
  // Render color after choose them
  const rendercolor = tempColor.map(clr => <span key={clr} className={`text-white text-xs rounded p-1 border`} style={{ backgroundColor: clr }}>{clr}</span>);

  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={open}>ADD TASK</Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4 gap-4">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} close={close} title="ADD A NEW PRODUCT" >
        <form className="space-y-3" onSubmit={onSubmitHandler}>
          {renderFormInputList}

          <div className="flex items-center space-x-1 my-3 flex-wrap">{renderProductColor}</div>

          <div className="flex flex-wrap space-x-1">{rendercolor}</div>

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
