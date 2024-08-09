import React from 'react';
import './Update.css'; // Asegúrate de crear un archivo CSS para el modal

const Update = ({ isOpen, onClose, onSubmit, newNombre, setNewNombre, newProfesion, setNewProfesion, newImage, setNewImage }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <form onSubmit={onSubmit} className='formulario-editar'>
          <div className='form-editar'>
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
            <input
              type="file"
              id="newImage"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          <button type="submit">Actualizar Famoso</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
