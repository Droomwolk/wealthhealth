/* eslint-disable import/no-unresolved */
import { NavLink } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="home-body">
      <div className="home-content">
        <div className="header" />
        <div className="ErrorPage-content">
          <div className="ErrorPage">
            <span className="number">404</span>
            <p>Oups! La page que vous demandez n'existe pas.</p>
          </div>
          <div className="linkToHome">
            <NavLink to="/" className={(nav) => (nav.isActive ? 'nav-active' : '')}>
              <p>Retourner sur la page d'accueil</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
