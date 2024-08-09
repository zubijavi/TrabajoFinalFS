import React, {useEffect} from 'react';
import './Home.css';

const Home = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return (
    <>
    <div className="home">
      <div className='contenedor-home'>
        <h1>{props.title}</h1>
        <main>
          <h3>Objetivo</h3>
          <p>
            Desarrollar una aplicación web utilizando <strong>Node.js</strong> y <strong>Express</strong> que permita realizar
            operaciones básicas de <strong>CRUD</strong> (Crear, Leer, Actualizar, Eliminar). La aplicación debe manejar datos
            dinámicos con el motor de plantillas <strong>HBS</strong>, <strong>EJS</strong> o <strong>React</strong> e integrar
            una <strong>API externa</strong>.
          </p>
        </main>
      </div>
        <figure>
          <img src="/icon.png" alt="Logo React" />
          <img src="/assets/css.png" alt="Logo CSS" />
          <img src="/assets/express.png" alt="Logo Express" />
          <img src="/assets/html.png" alt="Logo HTML" />
          <img src="/assets/js.png" alt="Logo JS" />
          <img src="/assets/mongodb.png" alt="Logo MongoDB" />
          <img src="/assets/multer.png" alt="Logo Multer" />
          <img src="/assets/node.png" alt="Logo Node" />
          <img src="/assets/git.png" alt="Logo Git" />
          <img src="/assets/terminal.png" alt="Logo Terminal" />
        </figure>
        </div>
    </>
  );
};

export default Home;
