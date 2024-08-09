import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css'

const Movies = (props) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    document.title = props.title;
  }, []);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=efc00acead0ad47f6f159cdbadd13720'); // URL correcta de la API
        console.log(response.data); // Verifica la estructura de la respuesta en la consola

        if (response.data && response.data.results) {
          setMovies(response.data.results);
        } else {
          console.error('La respuesta de la API no contiene un array de películas');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div>
      <h1>{props.title}</h1>
      <div className='contenedor-principal'>
        {movies.map(movie => (
          <div className="card">
            {movie.poster_path ? (
              <div key={movie.id} className='contenedor-img'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ) : (
              <h3>Imagen no disponible</h3>
            )}
            <div className='contenedor-detalles'>
              <h2>{movie.title}</h2>
              <p className='overview'>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;