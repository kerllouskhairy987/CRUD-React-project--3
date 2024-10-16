import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

function Input({ ...rest }: IProps) {
    return <input {...rest} />
}

export default Input;