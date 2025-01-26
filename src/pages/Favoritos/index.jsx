import { useEffect, useState } from 'react';
import './Favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Favoritos = () => {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    const removerFilme = (id) => {
        let filtroFilmes = filmes.filter((filme) => {
            return filme.id !== id;
        });



        setFilmes(filtroFilmes);
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes));
        toast.success('Filme removido dos favoritos!', {
            className: 'toast-success',
            bodyClassName: 'toast-body',
            progressClassName: 'toast-progress',
        });
    };

    return (
        <div className="favoritos-container">
            <h1>Meus Filmes</h1>

            {filmes.length === 0 ? (
                <span className="empty">Você ainda não tem filmes salvos!</span>
            ) : (
                <ul>
                    {filmes.map((filme) => (
                        <li key={filme.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200/${filme.poster_path}`}
                                alt={filme.title}
                            />
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`} className="btn detalhes">
                                    Ver Detalhes
                                </Link>
                                <button onClick={() => removerFilme(filme.id)} className="btn remover">
                                    Remover
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favoritos;
