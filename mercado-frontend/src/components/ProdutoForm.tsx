import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Produto, Categoria } from '../types/interfaces';
import './Produto.css';

interface ProdutoFormProps {
  produtoEditavel?: Produto;
  onSave: () => void;
  onCancelEdit?: () => void; // nova prop
}

export default function ProdutoForm({ produtoEditavel, onSave, onCancelEdit }: ProdutoFormProps) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    api.get<Categoria[]>('/categorias').then(res => setCategorias(res.data));
  }, []);

  useEffect(() => {
    if (produtoEditavel) {
      setNome(produtoEditavel.nome);
      setPreco(produtoEditavel.preco);
      setCategoriaId(produtoEditavel.categoriaId);
    }
  }, [produtoEditavel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dados = { nome, preco, categoriaId };

    const requisicao = produtoEditavel
      ? api.put(`/produtos/${produtoEditavel.id}`, dados)
      : api.post('/produtos', dados);

    requisicao
      .then(() => {
        alert(produtoEditavel ? 'Produto atualizado!' : 'Produto cadastrado!');
        setNome('');
        setPreco(0);
        setCategoriaId(0);
        onSave();
        if (produtoEditavel && onCancelEdit) onCancelEdit();
      })
      .catch(err => console.error('Erro ao salvar produto:', err));
  };

  return (
    <form onSubmit={handleSubmit} className="produto-form">
      <h2>{produtoEditavel ? 'Editar Produto' : 'Cadastrar Produto'}</h2>

      <label>Nome:</label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} required />

      <label>Preço:</label>
      <input
        type="number"
        value={preco}
        onChange={(e) => setPreco(Number(e.target.value))}
        required
      />

      <label>Categoria:</label>
      <select
        value={categoriaId}
        onChange={(e) => setCategoriaId(Number(e.target.value))}
        required
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </select>

      <button type="submit">{produtoEditavel ? 'Atualizar' : 'Cadastrar'}</button>
    </form>
  );
}
