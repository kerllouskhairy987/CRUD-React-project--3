interface IProps {
    msg: string;
}

function ErrorMassege({ msg }: IProps) {
    return msg ? <span className="block font-semibold text-sm text-red-700">{msg}</span> : null;
}

export default ErrorMassege;