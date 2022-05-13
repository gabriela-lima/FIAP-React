import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import Lista from './Lista.js';
import Cartao from './Cartao.js';
import 'bootstrap/dist/css/bootstrap.css';


function App() {


  const [usuarios, setUsuarios] = useState([]);
  const [id,setId] = useState("");
  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");

  
  function salvarFormulario(){
      

      let parametros = {
          name: nome,
          email: email,
          password: senha
      }
      axios.post('https://iot.14mob.com/api-fiap/public/index.php/users', parametros).then(response => {
          if(response.status == 201){
              alert('Ebaaaaa deu certo')
              atualizarLista()
          }else{
              alert('lascou')
          }
      }).catch( error => console.log(error));

  }

  

  function atualizarUsuarioApi(){

      let parametros = {
          name: nome,
          email: email,
          password: senha
      }
      axios.put('https://iot.14mob.com/api-fiap/public/index.php/users/'+ id, parametros).then(response => {
          if(response.status == 200){
              alert('Ebaaaaa deu certo')
              atualizarLista()
          }else{
              alert('lascou')
          }
      }).catch( error => console.log(error));
  }

  function atualizarUsuario(usuario){
      setId(usuario.id);
      setNome(usuario.name);
      setEmail(usuario.email);
      setSenha(usuario.password);
  }

  function atualizarLista(){
    axios.get('https://iot.14mob.com/api-fiap/public/index.php/users').then( response => {
        setUsuarios(response.data.users);
    })
  }
  
useEffect(() => {
      atualizarLista();
  },[])


return (
    <div className='container'>
        <Cartao titulo="Cadastro de usuário">
            <form className="formulario" onSubmit={event => {
                event.preventDefault();
                if(id != ''){
                    atualizarUsuarioApi()
                }else{
                    salvarFormulario()
                }
                return false;
                } } > 

                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='input-group input-group-sm mb-3'>
                            <span className="input-group-text" id="inputGroup-sizing-sm">Nome:</span>
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="name"  value={ nome }  onChange={ e => setNome(e.target.value) }></input>
                            {/* <label>Nome</label> */}
                            {/* <input name="name"  value={ nome }  onChange={ e => setNome(e.target.value) } /> */}
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                            <div className='input-group input-group-sm mb-3'> 
                                <span className="input-group-text" id="inputGroup-sizing-sm">Senha:</span>
                                <input type="password" class="form-control" id="inputPassword" name="password" value={ senha } onChange={ e => setSenha(e.target.value) }></input>
                                {/* <label>senha</label>
                                <input name="password" value={ senha } onChange={ e => setSenha(e.target.value) } /> */}
                            </div>
                        </div>
                    </div>  
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='input-group input-group-sm mb-3'> 
                            <span className="input-group-text" id="inputGroup-sizing-sm">Email:</span>
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="email" value={ email } onChange={ e => setEmail(e.target.value) }></input>
                            {/* <label>Email</label>
                            <input name="email" value={ email } onChange={ e => setEmail(e.target.value) } /> */}
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-8'>
                        <button type="submit" className='btn btn-success'>Enviar</button>
                    </div>
                </div>
                
            </form>
        </Cartao>
        <Cartao titulo="Lista de usuários">
            <Lista usuarios={usuarios} atualizarLista = {e => atualizarLista()} onEditar= { usuario => atualizarUsuario(usuario) } ></Lista>
        </Cartao>
      

  </div>
    
    
);

  
}

export default App;