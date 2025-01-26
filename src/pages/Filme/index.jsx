import { useParams } from 'react-router-dom';
import './Filme.css';
import { useEffect, useState } from 'react';

import api from '../../services/api';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

const Filme = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: '2ae36e1bb31154c3bfa66bb0492567d3',
            language: 'pt-BR',
            append_to_response: 'videos', // Inclui trailers e vídeos
          },
        });
        setFilme(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar o filme: ", error);
        setLoading(false);
      }
    }

    loadFilme();
  }, [id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if (hasFilme) {
      toast.warn('Filme já foi adicionado aos favoritos!', {
        className: 'toast-warning',
        bodyClassName: 'toast-body',
        progressClassName: 'toast-progress',
      });
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success('Filme adicionado aos favoritos!', {
      className: 'toast-success',
      bodyClassName: 'toast-body',
      progressClassName: 'toast-progress',
    });
  }

  if (loading) {
    return <Loading />;
  }

  if (!filme.id) {
    return <div className="error">Filme não encontrado!</div>;
  }

  // Buscar o trailer ou usar uma imagem de fundo
  const trailer = filme.videos?.results.find((video) => video.type === 'Trailer');
  const backgroundImage = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}&controls=0&showinfo=0&modestbranding=1&rel=0`
    : `https://image.tmdb.org/t/p/original/${filme.backdrop_path}`;

  return (
    <div className="filme-info">
      <div className="trailer-background">
        {trailer ? (
          <iframe
            src={backgroundImage}
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="Trailer do Filme"
          ></iframe>
        ) : (
          <div
            className="fallback-background"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          ></div>
        )}
      </div>

      <div className="content">
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
          alt={filme.title}
          className="poster"
        />
        <div className="details">
          <h1>{filme.title}</h1>
          <h3>Sinopse</h3>
          <p>{filme.overview || "Sinopse não disponível."}</p>
          <h4>Nota: {filme.vote_average.toFixed(1)}/10</h4>
          <h4>Lançamento: {new Date(filme.release_date).toLocaleDateString('pt-BR')}</h4>
          <div className="buttons">
            {trailer ? (
              <a
                href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}
                target="_blank"
                rel="noreferrer"
                className="btn trailer"
              >
                Assistir Trailer
              </a>
            ) : (
              <span className="no-trailer">Trailer não disponível</span>
            )}
            <button className="btn favorite" onClick={salvarFilme}>Salvar nos Favoritos</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filme;




