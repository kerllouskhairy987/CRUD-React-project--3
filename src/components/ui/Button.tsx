interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className: string;
    children: string;
}

function Button({ children, className, ...rest}: IProps) {
    return <button className={`${className} text-white rounded-md grow p-3`} {...rest}> {children} </button>
}

export default Button;