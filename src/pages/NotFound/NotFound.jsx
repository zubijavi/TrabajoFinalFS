// src/pages/NotFound/NotFound.jsx
import React, {useEffect} from 'react';
import './NotFound.css'

const NotFound = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, []);
  return (
    <div className='not-found'>
      <h1>Pagina No Encontrada</h1>
    </div>
  );
};

export default NotFound;
