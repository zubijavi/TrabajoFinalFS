import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Api.css'


const Api = (props) => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = props.title;
  }, []);
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_HARRYPOTTER_API_URL}`)

        if (Array.isArray(response.data)) {
          setCharacters(response.data);
        } else {
          console.error('La respuesta de la API no contiene un array de personajes');
        }
        setSearchTerm('');
      } catch (error) {
        console.error('Error al obtener los personajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('https://hp-api.herokuapp.com/api/characters');
      if (Array.isArray(response.data)) {
        const filteredCharacters = response.data.filter(character =>
          character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          character.house.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCharacters(filteredCharacters);
      } else {
        console.error('La respuesta de la API no contiene un array de personajes');
      }
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='contenedor-api'>
      <h1>{props.title}</h1>
        <form onSubmit={handleSearch} className='form-api'>
            <input
              type="text"
              name="search"
              placeholder="Buscar por nombre o casa"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          <button type="submit">Buscar</button>
        </form>

        {loading ? <h2>Cargando API</h2> : (
          <table className='table-api'>
            <thead>
              <tr>
                <th>Name</th>
                <th>House</th>
                <th>Date of Birth</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character, index) => (
                <tr key={index}>
                  <td>{character.name}</td>
                  <td>{character.house}</td>
                  <td>{character.dateOfBirth}</td>
                  <td>
                    {character.image ? (
                      <img src={character.image} alt={character.name} />
                    ) : (
                      <img src="/assets/noImg.jpeg" alt="Imagen no disponible" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
};

export default Api;
