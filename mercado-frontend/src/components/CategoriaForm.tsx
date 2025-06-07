import React, { useState } from 'react';
import api from '../services/api';

interface Props {
  onSave: () => void;
}

export default function CategoriaForm({ onSave }: Props) {
  const [nome, setNome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) return;

    api.post('/categorias', { nome })
      .then(() => {
        alert('Categoria cadastrada com sucesso!');
        setNome('');
        onSave(); // recarrega a lista
      })
      .catch(err => {
        console.error('Erro ao cadastrar categoria:', err);
        alert('Erro ao cadastrar categoria. Verifique o console.');
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
