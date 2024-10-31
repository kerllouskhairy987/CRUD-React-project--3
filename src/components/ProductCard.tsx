import { IProduct } from "../Interfaces";
import { txtSlicer } from "../Utils/function";
import CicleColor from "./CicleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
    product: IProduct;
    setProductToEdit: (product: IProduct) => void;
    OpenEditModal: () => void;
    idx: number;
    setProductToEditIdx: (value: number) => void;
    openDeleteModal: () => void;
}

function ProductCard({ product, setProductToEdit, OpenEditModal, idx, setProductToEditIdx, openDeleteModal }: IProps) {
    const { title, description, imageURL, price, colors, category } = product;
    // Map on circle colors
    const renderProductColor = colors.map(color => <CicleColor color={color} key={color} />)


    //** -- Handler -- **//
    const onEdit = () => {
        setProductToEdit(product);
        OpenEditModal()
        setProductToEditIdx(idx)
    }
    
    const onDelete = () => {
        setProductToEdit(product);
        openDeleteModal()
    }

    return (
        <div className="mx-auto md:mx-0 max-w-sm border rounded-md p-2 flex flex-col justify-between hover:scale-105 transition-all">
            <Image imageUrl={imageURL} alt={title}
                className="rounded-t-md mb-3 h-52 lg:object-cover" />

            <h3 className="font-semibold text-lg pb-1">{txtSlicer(title, 30)}</h3>

            <p className="text-gray-500 text-sm"> {txtSlicer(description)} </p>

            <div >
                {
                    renderProductColor.length !== 0 ?
                        <div className="flex items-center space-x-1 my-3 flex-wrap">{renderProductColor}</div> :
                        <p className="font-medium text-sm">Not Available Colors!</p>
                }


                <div className="flex items-center justify-between">
                    <span> ${price} </span>
                    <div className="flex space-x-1 items-center">
                        <span>{category.name}</span>
                        <img className="w-10 h-10 rounded-full" src={category.imageURL} alt={category.name} />
                    </div>
                </div>

                <div className="flex space-x-2 items-center mt-5">
                    <Button className="bg-indigo-700" onClick={onEdit} width="w-full">EDIT</Button>
                    <Button className="bg-red-700" width="w-full" onClick={onDelete}>DELETE</Button>
                </div>
            </div>

        </div>
    )
}

export default ProductCard;