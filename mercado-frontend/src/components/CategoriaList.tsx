import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Categoria } from '../types/interfaces';

export default function CategoriaList() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    api.get<Categoria[]>('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Erro ao buscar categorias:', err));
  }, []);

  return (
    <div>
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