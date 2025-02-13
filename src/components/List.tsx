const List = () => {
    return (
        <div>
            {Array.from({ length: 10_000 }, (_, index) => (
                <p>Item {index + 1}</p>
            ))}
        </div>
    )
}

export default List