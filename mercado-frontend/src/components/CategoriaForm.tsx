import React, { useState } from 'react';
import api from '../services/api';
import { Categoria } from '../types/interfaces';

interface Props {
  categorias: Categoria[];
  setCategorias: (cats: Categoria[]) => void;
}

export default function CategoriaForm({ categorias, setCategorias }: Props) {
  const [nome, setNome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) return;

    const novaCategoria: Categoria = {
      id: Math.max(0, ...categorias.map(c => c.id)) + 1,
      nome
    };

    setCategorias([novaCategoria, ...categorias]);

    setNome('');

    api.post('/categorias', { nome })
      .then(res => {
        console.log('Categoria cadastrada com sucesso!', res.data);
      })
      .catch(err => {
        alert('Erro ao cadastrar no backend!');
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Nova Categoria</h2>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome da categoria"
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

