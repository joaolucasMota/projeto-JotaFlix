import {useEffect, useState} from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom';
import './home.css';


function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading,setLoading] = useState(true);
//utilizando a baixo o useEffect para buscar a API
    useEffect(()=>{

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "01938e2bca6a4f1b437bc241ea873787",
                    language: "pt-BR",
                    page: 1
                }
            })
            //agora vou passar para o setFilmes o array com os dados da API, o slice serve para eu definir a quantiade de filmes que vou receber por vez
            setFilmes(response.data.results.slice(0,20))
            setLoading(false)

            //console.log(response.data.results.slice(0,10))
        }
        loadFilmes();
    }, [])


    if(loading){
        return(
            <div className="loading">
                <h2>Carregando...</h2>
            </div>
        )
    }


    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong className="titulo">{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Informações</Link>
                            <br/>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;