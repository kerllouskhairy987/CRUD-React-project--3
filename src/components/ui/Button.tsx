interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className: string;
    children: string;
    width?: "w-full" | "w-fit";
}

function Button({ children, className, width = "w-full", ...rest}: IProps) {
    return <button className={`${className} ${width} text-white rounded-md p-3`} {...rest}> {children} </button>
}

export default Button;