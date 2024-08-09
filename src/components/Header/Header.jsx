import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <h1>Full Stack Avanzado</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end activeClassName="active">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/api" activeClassName="active">Harry Potter</NavLink>
          </li>
          <li>
            <NavLink to="/movies" activeClassName="active">Movies API</NavLink>
          </li>
          <li>
            <NavLink to="/database" activeClassName="active">Base de Datos</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
