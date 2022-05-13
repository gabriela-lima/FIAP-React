function Cartao(props){
    return(
        <div className="card my-3 text-dark bg-light mb-3">
            <div className="card-body">
                    <h3 className="card-title titulos">{props.titulo}</h3>
                    {props.children}
            </div>
        </div>
    )
}

export default Cartao