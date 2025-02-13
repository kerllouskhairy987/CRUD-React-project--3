import { memo } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className: string;
    children: string;
    width?: "w-full" | "w-fit";
}

function Button({ children, className, width = "w-full", ...rest}: IProps) {
    return <button className={`${className} ${width} text-white rounded-lg p-3 active:scale-95`} {...rest}> {children} </button>
}

export default memo(Button);