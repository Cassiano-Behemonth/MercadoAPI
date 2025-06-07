import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Categoria } from '../types/interfaces';
import CategoriaForm from './CategoriaForm';

export default function CategoriaList() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const carregarCategorias = () => {
    api.get<Categoria[]>('/categorias')
      .then(res => {
        setCategorias(res.data);
      })
      .catch(err => console.error('Erro ao buscar categorias:', err));
  };

  useEffect(() => {
    carregarCategorias(); // inicial
  }, []);

  return (
    <div>
      <CategoriaForm onCategoriaAdicionada={carregarCategorias} /> {/* <-- Aqui */}
      <hr />
      <h2>Lista de Categorias</h2>
      <ul>
        {categorias.map(cat => (
          <li key={cat.id}>
            {cat.nome} (ID: {cat.id})
          </li>
        ))}
      </ul>
    </div>
  );
}
