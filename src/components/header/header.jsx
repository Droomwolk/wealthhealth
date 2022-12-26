/* eslint-disable import/no-unresolved */
import { NavLink, Link } from 'react-router-dom';
import Logo from '../../assets/wealth.jpg';
import '../../scss/main.scss';

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={Logo} alt="header-logo" className="header__logo" />
      </Link>
      <nav className="header__link">
        <Link
          to="/home"
          className='header__link-nav'
        >
          <div className="header__link-home">
            <span className="header__link-home-title">Create employee</span>
          </div>
        </Link>
        <Link
          to="/employeelist"
          className='header__link-nav'
        >
          <div className="header__link-list">
            <span className="header__link-list-title">Employee List</span>
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
