interface IProps {
    className: string;
    children: string;
}

function Button({ children, className }: IProps) {
    return <button className={`${className} text-white rounded-md grow p-3`}> {children} </button>
}

export default Button;