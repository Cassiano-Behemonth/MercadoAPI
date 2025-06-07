import React, { useState } from 'react';
import api from '../services/api';

interface Props {
  onCategoriaAdicionada: () => void; // função que será chamada após cadastro
}

export default function CategoriaForm({ onCategoriaAdicionada }: Props) {
  const [nome, setNome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api.post('/categorias', { nome })
      .then(() => {
        alert('Categoria cadastrada com sucesso!');
        setNome('');
        onCategoriaAdicionada(); // ← força o recarregamento da lista após sucesso
      })
      .catch(err => {
        console.error('Erro ao cadastrar categoria:', err);
        alert('Erro ao cadastrar categoria.');
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
