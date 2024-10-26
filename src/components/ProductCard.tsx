import { IProduct } from "../Interfaces";
import { txtSlicer } from "../Utils/function";
import CicleColor from "./CicleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
    product: IProduct;
}

function ProductCard({ product }: IProps) {
    const { title, description, imageURL, price, colors, category } = product;
    // Map on circle colors
    const renderProductColor = colors.map(color => <CicleColor color={color} key={color} />)

    return (
        <div className="mx-auto md:mx-0 max-w-sm border rounded-md p-2 flex flex-col justify-between hover:scale-105 transition-all">
            <Image imageUrl={imageURL} alt={title}
                className="rounded-t-md mb-3 h-52 lg:object-cover" />

            <h3 className="font-semibold text-lg pb-1">{txtSlicer(title, 30)}</h3>


            <p className="text-gray-500 text-sm"> {txtSlicer(description)} </p>

            <div >
                <div className="flex items-center space-x-1 my-3 flex-wrap">{renderProductColor}</div>

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

        </div>
    )
}

export default ProductCard;