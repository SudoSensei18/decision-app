function Button ({label, onClick}){
    return(
        <button onClick={onClick} className="primary-button">
            {label}
        </button>
    )
}
export default Button;