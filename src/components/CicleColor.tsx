interface IProps {
color: string;
}

function CicleColor({ color }: IProps) {
    return <span className={`w-5 h-5 rounded-full cursor-pointer mb-1 border`} style={{backgroundColor: color}} />
}

export default CicleColor;