import { IProduct } from "../Interfaces";
import { txtSlicer } from "../Utils/function";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
    product: IProduct;
}

function ProductCard({ product }: IProps) {
    const {title, description, imageURL, price, category} = product;
    return (
        <div className="mx-auto md:mx-0 max-w-sm border rounded-md p-2 flex flex-col hover:scale-105 transition-all">
            <Image imageUrl={imageURL} alt={title}
            className="rounded-t-md mb-3 h-48 object-cover" />

            <h3 className="font-bold pb-1">{txtSlicer(title, 30)}</h3>


            <p> {txtSlicer(description)} </p>

            <div className="flex items-center space-x-2 my-3">
                <span className="w-5 h-5 bg-indigo-400 rounded-full cursor-pointer" />
                <span className="w-5 h-5 bg-yellow-400 rounded-full cursor-pointer" />
                <span className="w-5 h-5 bg-red-400 rounded-full cursor-pointer" />
            </div>

            <div className="flex items-center justify-between">
                <span> ${price} </span>
                <img className="w-10 h-10 rounded-full" src={category.imageURL} alt={category.name} />
            </div>

            <div className="flex space-x-2 items-center mt-5">
                <Button className="bg-indigo-700" onClick={() => console.log("clicked")}
                    width="w-full">EDIT</Button>
                <Button className="bg-red-700" width="w-full">DELETE</Button>
            </div>

        </div>
    )
}

export default ProductCard;