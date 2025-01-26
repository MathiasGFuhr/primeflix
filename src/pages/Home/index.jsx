import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css'
import Loading from "../../components/Loading";


const Home = () => {

  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "2ae36e1bb31154c3bfa66bb0492567d3",
          language: "pt-BR",
          page: 1,
        }
      })

      setFilmes(response.data.results);

    }

    loadFilmes();
    setLoading(false);
  }, [])


  if(loading){
    return(
      <Loading/>
    )
  }
  return (
    <div className="container">
      <div className="lista-filme">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
               <strong>{filme.title}</strong>
               <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filmes.title} />
               <Link to={`/filme/${filme.id}`}>Detalhes</Link>

            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Home