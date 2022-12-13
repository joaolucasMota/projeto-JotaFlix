import {Link} from 'react-router-dom';
import './erro.css'

function Erro(){
    return(
        <div className="erro">
            <h1>Ops!</h1>
            <h2>A URL acessada não existe para este site.</h2>
            <Link to="/">Volte ao inicio</Link>
        </div>
    )
}

export default Erro;