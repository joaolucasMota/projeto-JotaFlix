import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme.css';
import { toast } from 'react-toastify';

function Filme(){
    const {id} = useParams();
    const navigation = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params: {
                    api_key: "01938e2bca6a4f1b437bc241ea873787",
                    language: "pt-BR"
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log('filme não encontrado')
                navigation("/",{replace: true});
                return;
            })
        }

        loadFilme();
    }, [navigation, id])

    function salvarFilme(){
        const favoritos = localStorage.getItem("@jotaflix");

        let filmesSalvos = JSON.parse(favoritos) || [];

        const temFilme = filmesSalvos.some((filmesalvo)=> filmesalvo.id === filme.id)

        if(temFilme){
            toast.warn('Filme já adicioado.');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@jotaflix", JSON.stringify(filmesSalvos))
        toast.success('Filme adicionado aos favoritos.')
    }

    if(loading){
        return(
            <div className="filme-info">
                <h2>Carregando...</h2>
            </div>
        )
    }
    
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
            <div className='info-filme'>
                <p>Lancamento : {filme.release_date}</p>
                <p>Duração : {filme.runtime} minutos</p>
                <p>Avaliação : {filme.vote_average.toFixed(1)} / 10</p>
            </div>
            <h3>Sinopse</h3>
                <p>{filme.overview}</p>
            <div className="area-buttons">
                <button onClick={salvarFilme}>Favoritar</button>

                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title}`} > Trailer</a>
                </button>

            </div>
        </div>
    )
}

export default Filme;