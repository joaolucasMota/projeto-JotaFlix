import axios from "axios";

//API: https://api.themoviedb.org/3/movie/now_playing?api_key=01938e2bca6a4f1b437bc241ea873787&language=pt-BR


//base da API: https://api.themoviedb.org/3/
//URL da API: /movie/now_playing?api_key=01938e2bca6a4f1b437bc241ea873787&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'

});

export default api;