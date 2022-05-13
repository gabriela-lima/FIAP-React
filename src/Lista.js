import axios from "axios";
//import { useEffect, useState } from "react";

function Lista(props){
    
    function removerUsuario(id){
  
        axios.delete("https://iot.14mob.com/api-fiap/public/index.php/users/" + id).then( response => {
            alert('Deu certo removi o usuario')
            props.atualizarLista()
  
        }).catch( error => console.log(error));
  
    }

    return(
            <div className="container">
                <table className='minhaTabela table table-dark table-hover'>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                        </tr>
                    
                    </thead>  
                    <tbody> 
                        { props.usuarios.map( usuario => {
                            return (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.name}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <button onClick={ event => props.onEditar(usuario) } className= 'btn btn-primary'> Editar </button>
                                        <button onClick={ event => removerUsuario(usuario.id) } className= 'deletar btn btn-danger'> Deletar </button>
                                    </td>
                                    
                                </tr>
                                )
                        } ) }
                    </tbody>
                </table>
            </div>
        
    )
}

export default Lista;