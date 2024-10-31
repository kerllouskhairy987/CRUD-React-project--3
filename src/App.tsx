import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import { Input } from "@headlessui/react";
import { IProduct } from "./Interfaces";
import { productValidation } from "./validation";
import ErrorMassege from "./components/ErrorMassege";
import CicleColor from "./components/CicleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { TypesNames } from "./Types/TypesNames";
import toast, { Toaster } from 'react-hot-toast';  // React Toast [react hot toast]


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
  const [products, setProducts] = useState<IProduct[]>(productList); // عملت الاستيت دي عشان اعرف اضيف علي الداتا لان الداتا كنت عاملها امبورت من الملف علي طول
  const [isOpen, setIsOpen] = useState(false); // product modal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false); // edit product modal
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false); // Delete product modal
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj)  // save edit
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0)  // save edit Idx
  const [tempColor, setTemColor] = useState<string[]>([]);
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" }); // Save Error Msg IN This State 
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);


  // ** Handler ** //
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const openEditModal = () => setIsOpenEditModal(true)
  const closeEditModal = () => setIsOpenEditModal(false)

  const openDeleteModal = () => setIsOpenDeleteModal(true)
  const closeDeleteModal = () => setIsOpenDeleteModal(false)
  // For Product 
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
  // For Edit
  const onChagneEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({
      ...productToEdit,
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
  const onCancelEdit = () => {
    setProduct(defaultProductObj);
    closeEditModal();
  }
  const onCancelDelete = () => {
    closeDeleteModal();
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

    // Handling the value of inputs 
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");
    if (!hasErrorMsg) {
      // save the error msg in this state 
      setErrors(errors);
      return;
    }
    // بدل م كنت بتبعت رساله لا دلوقتي اعملي ست ل ال برودكت و ابعت ال اي دي و ال كلرز
    setProducts((prev) => [{ ...product, id: uuid(), colors: tempColor, category: selectedCategory }, ...prev]);
    setProduct(defaultProductObj); // To empty the inputs
    setTemColor([]);               // To clear the circle color
    close();                       // To close the modal

    toast('Product Has Been Added 🖐', {
      className: 'bg-black text-white',
    })
  }

  const onSubmitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Destructuring Product IN ES6 When we write title: title THIS equal to title 
    const { title, description, imageURL, price } = productToEdit;
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

    // Handling the value of inputs 
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");
    if (!hasErrorMsg) {
      // save the error msg in this state 
      setErrors(errors);
      return;
    }
    console.log(hasErrorMsg);

    const updateProducts = [...products];
    updateProducts[productToEditIdx] = { ...productToEdit, colors: tempColor.concat(productToEdit.colors) };
    setProducts(updateProducts);

    setProductToEdit(defaultProductObj);  // To empty the inputs
    setTemColor([]);                      // To clear the circle color
    closeEditModal();                     // To close the modal

    toast('Product Has Been Updated ✅', {
      className: 'bg-black text-white',
    })
  }

  const removeProductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id)
    setProducts(filtered);
    closeDeleteModal();

    toast('Product Has Been Deleted 👍', {
      className: 'bg-black text-white',
    })
  }

  // ** Renders ** //
  const renderProductList = products.map((item, idx) =>
    <ProductCard
      key={item.id}
      product={item}
      setProductToEdit={setProductToEdit}
      OpenEditModal={openEditModal}
      openDeleteModal={openDeleteModal}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
    />)

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
    if (productToEdit.colors.includes(color)) {
      // Toggle the color
      setTemColor(prev => prev.filter(item => item !== color))
      return;
    }
    // Adding the color and prev color
    setTemColor((prev) => [...prev, color])
  }} />);
  // Render color after choose them
  const rendercolor = tempColor.concat(productToEdit.colors).map(clr => <span key={clr} className={`text-white text-xs rounded p-1 border`} style={{ backgroundColor: clr }}>{clr}</span>);

  const renderProductEditWithErrorMsg = (id: string, label: string, name: TypesNames) => {
    return (<div className="flex flex-col">
      <label htmlFor={"title"} className="font-medium text-sm text-gray-700 mb-[2px]">{label}</label>
      <Input
        type="text"
        id={id}
        name={name}
        value={productToEdit[name]}
        onChange={onChagneEditHandler}
        className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg text-lg p-3"
      />
      {/* Render the Error Msg Blow the Input */}
      <ErrorMassege msg={errors[name]} />
    </div>)
  }
  return (
    <main className="container mt-4">
      <div className="flex justify-between items-center px-4">
        <h2 className="font-bold text-2xl text-indigo-800">Latest <span className="text-black text-3xl">Product</span></h2>
        <Button width="w-fit" className="bg-indigo-700 hover:bg-indigo-800" onClick={open}>ADD PRODUCT</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4 gap-4">
        {renderProductList}
      </div>

      {/* Add Product Modal */}
      <Modal isOpen={isOpen} close={close} title="ADD A NEW PRODUCT" >
        <form className="space-y-3" onSubmit={onSubmitHandler}>
          {renderFormInputList}

          <Select selected={productToEdit.category} setSelected={(value) => setProductToEdit({ ...productToEdit, category: value })} />

          <div className="flex items-center space-x-1 my-3 flex-wrap">{renderProductColor}</div>

          <div className="flex flex-wrap space-x-1">{rendercolor}</div>

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={isOpenEditModal} close={closeEditModal} title="EDIT THIS PRODUCT" >
        <form className="space-y-3" onSubmit={onSubmitEditHandler}>

          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg("description", "Product Description", "description")}
          {renderProductEditWithErrorMsg("imageURL", "Product image URL", "imageURL")}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}

          <Select selected={selectedCategory} setSelected={setSelectedCategory} />

          <div className="flex items-center space-x-1 my-3 flex-wrap">{renderProductColor}</div>

          <div className="flex flex-wrap space-x-1">{rendercolor}</div>

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={onCancelEdit}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Product Modal */}
      <Modal
        isOpen={isOpenDeleteModal}
        close={closeDeleteModal}
        title="Are you sure you want to remove this product from your store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure is the intended action."
      >

        <div className="flex items-center space-x-3">
          <Button className="bg-red-700 hover:bg-red-800" onClick={removeProductHandler}>Yes, remove</Button>
          <Button className="bg-gray-400 hover:bg-gray-500" onClick={onCancelDelete}>Cancel</Button>
        </div>
      </Modal>

      <Toaster />
    </main >
  )
}

export default App;
