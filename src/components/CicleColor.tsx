import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    color: string;
}

function CicleColor({ color, ...rest }: IProps) {
    return <span className={`w-5 h-5 rounded-full cursor-pointer mb-1 border`} style={{ backgroundColor: color }} {...rest} />
}

export default CicleColor;