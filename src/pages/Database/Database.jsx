import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Database.css';
import Update from './Update';

const Database = (props) => {
  const [famosos, setFamosos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [profesion, setProfesion] = useState('');
  const [newNombre, setNewNombre] = useState('');
  const [newProfesion, setNewProfesion] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [updateOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = props.title;
  }, []);

  useEffect(() => {
    const fetchFamosos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/famosos');
        setFamosos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchFamosos();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/api/famosos', {
        params: { nombre, profesion }
      });
      setFamosos(response.data);
      setNombre(''); // Restablece el campo de nombre
      setProfesion(''); // Restablece el campo de profesión
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  const handleAddFamoso = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', newNombre);
    formData.append('profesion', newProfesion);
    formData.append('image', newImage);

    try {
      await axios.post('http://localhost:3000/api/famosos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewNombre('');
      setNewProfesion('');
      setNewImage(null);
      fileInputRef.current.value = ''; // Restablece el campo de carga de archivos
      const response = await axios.get('http://localhost:3000/api/famosos');
      setFamosos(response.data);
    } catch (error) {
      console.error('Error al agregar el nuevo famoso:', error);
    }
  };

  const handleEditFamoso = (id) => {
    const famoso = famosos.find(f => f._id === id);
    setEditId(id);
    setNewNombre(famoso.nombre);
    setNewProfesion(famoso.profesion);
    setModalOpen(true);
  };

  const handleUpdateFamoso = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', newNombre);
    formData.append('profesion', newProfesion);
    if (newImage) {
      formData.append('image', newImage);
    }

    try {
      await axios.put(`http://localhost:3000/api/famosos/${editId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewNombre('');
      setNewProfesion('');
      setNewImage(null);
      fileInputRef.current.value = ''; // Restablece el campo de carga de archivos
      setEditId(null);
      setModalOpen(false);
      const response = await axios.get('http://localhost:3000/api/famosos');
      setFamosos(response.data);
    } catch (error) {
      console.error('Error al actualizar el famoso:', error);
    }
  };

  const handleDeleteFamoso = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este famoso?")) {
      try {
        await axios.delete(`http://localhost:3000/api/famosos/${id}`);
        const response = await axios.get('http://localhost:3000/api/famosos');
        setFamosos(response.data);
      } catch (error) {
        console.error('Error al eliminar el famoso:', error);
      }
    }
  };

  return (
    <>
      <h1>Base de Datos</h1>
      <div className="formularios">
        <form onSubmit={handleSearch} className='formulario-buscar'>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Introduce el nombre"
          />
          <select
            id="profesion"
            value={profesion}
            onChange={(e) => setProfesion(e.target.value)}
          >
            <option value="">Disciplina</option>
            <option value="Deporte">Deporte</option>
            <option value="Ciencia">Ciencia</option>
            <option value="Arte">Arte</option>
          </select>
          <button type="submit">Buscar</button>
        </form>

        <form onSubmit={handleAddFamoso} className='formulario-agregar'>
          <div className='flex'>
            <input
              type="text"
              id="newNombre"
              placeholder="Introduce el nombre"
              value={newNombre}
              onChange={(e) => setNewNombre(e.target.value)}
              required
            />
            <select
              id="newProfesion"
              value={newProfesion}
              onChange={(e) => setNewProfesion(e.target.value)}
              required
            >
              <option value="">Disciplina</option>
              <option value="Deporte">Deporte</option>
              <option value="Ciencia">Ciencia</option>
              <option value="Arte">Arte</option>
            </select>
          </div>
          <div className='flex'>
            <input
              type="file"
              id="newImage"
              onChange={(e) => setNewImage(e.target.files[0])}
              ref={fileInputRef}
            />
          </div>
          <button type="submit">Agregar Famoso</button>
        </form>
      </div>

      <div className='contenedor-tabla'>
        <table className='tabla-famosos'>
          {
            famosos.length <= 0 ? (
              <h2>Base sin registros</h2>
            ) : (
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Disciplina</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
            )
          }

          <tbody>
            {famosos.slice().reverse().map((famoso, index) => (
              <tr key={index}>
                <td>{famoso.nombre}</td>
                <td>{famoso.profesion}</td>
                <td className='flex-image'>
                  {famoso.image ? (
                    <img src={`http://localhost:5173${famoso.image}`} alt={famoso.nombre} style={{ width: '100px', height: 'auto' }} />
                  ) : (
                    <img src="/assets/noImg.jpeg" alt="Imagen no disponible" style={{ width: '100px', height: 'auto' }} />
                  )}
                </td>
                <td>
                  <div className='editar'>
                    <button onClick={() => handleEditFamoso(famoso._id)}>Modificar</button>
                    <button onClick={() => handleDeleteFamoso(famoso._id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para editar famoso */}
      <Update
        isOpen={updateOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleUpdateFamoso}
        newNombre={newNombre}
        setNewNombre={setNewNombre}
        newProfesion={newProfesion}
        setNewProfesion={setNewProfesion}
        newImage={newImage}
        setNewImage={setNewImage}
      />
    </>
  );
};

export default Database;
