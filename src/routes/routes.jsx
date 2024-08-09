// src/routes/routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Api from '../pages/Api/Api';
import Database from '../pages/Database/Database';
import Movies from '../pages/Movies/Movies';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home title="Vista Principal"/>} />
    <Route path="/api" element={<Api title="API-Harry Potter"/>} />
    <Route path="/database" element={<Database title="Base de Datos"/>} />
    <Route path="/movies" element={<Movies title="API-Movies" />} />
    <Route path="*" element={<NotFound title="Not Found"/>} />
  </Routes>
);

export default AppRoutes;
