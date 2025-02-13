import { InputHTMLAttributes, memo } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

function Input({ className, ...rest }: IProps) {
    return <input
        className={`className`}
        {...rest}
    />
}

export default memo(Input);