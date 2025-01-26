import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Opa! Parece que esta página não existe.</p>
      <Link to="/" className="home-button">Voltar para o Início</Link>
    </div>
  );
};

export default NotFound;
