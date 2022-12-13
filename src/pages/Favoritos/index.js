import { useEffect, useState } from "react";
import "./favoritos.css"
import { Link } from "react-router-dom";



function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@jotaflix");
        setFilmes(JSON.parse(minhaLista) || [])

    })

    return(
        <div className="favoritos1">
            <h1>Favoritos</h1>
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Detalhes</Link>
                                <button>Excluir</button>
                            </div>
                        </li>
                        
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;