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
    carregarCategorias();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '30px auto', padding: 20, backgroundColor: '#fafafa', borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
      <CategoriaForm onCategoriaAdicionada={carregarCategorias} />
      <hr style={{ margin: '30px 0' }} />
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Lista de Categorias</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {categorias.map(cat => (
          <li
            key={cat.id}
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#e3f2fd',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <strong>{cat.nome}</strong> (ID: {cat.id})
          </li>
        ))}
      </ul>
    </div>
  );
}
