import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
    <header>
      <div className="container">
        <Link className='logo' to='/'>Prime Flix</Link>
        <Link className='favoritos' to='/favoritos'>Meus Filmes</Link>
      </div>
    </header>
  )
}

export default Header