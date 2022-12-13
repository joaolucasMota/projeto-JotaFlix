import { useEffect, useState } from "react";
import "./favoritos.css"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@jotaflix");
        setFilmes(JSON.parse(minhaLista) || [])

    },[])

    function excluirFilme(id){ 
        let filtroFilmes = filmes.filter((item)=> {
            return(item.id !== id)
        })
        
        setFilmes(filtroFilmes);
        localStorage.setItem('@jotaflix', JSON.stringify(filtroFilmes))
        toast.success("Filme removido com sucesso.")
    }

    return(
        <div className="favoritos1">
            <h1>Favoritos</h1>
            {filmes.length === 0 && <span>Você não possui favoritos adiconados.</span>}
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Detalhes</Link>
                                <button onClick={()=>excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                        
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;