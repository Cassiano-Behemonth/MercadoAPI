import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Produto, Categoria } from '../types/interfaces';
import './Produto.css';

interface ProdutoFormProps {
  produtoEditavel?: Produto;
  onSave: () => void;
  onCancelEdit: () => void; 
}

export default function ProdutoForm({ produtoEditavel, onSave, onCancelEdit }: ProdutoFormProps) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState<string>('');          
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = () => {
    api.get<Categoria[]>('/categorias')
      .then(res => setCategorias(res.data));
  };


  useEffect(() => {
    if (produtoEditavel) {
      setNome(produtoEditavel.nome);
      setPreco(produtoEditavel.preco.toString());        
      setCategoriaId(produtoEditavel.categoriaId);
    }
  }, [produtoEditavel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dados = {
      nome,
      preco: Number(preco),                              
      categoriaId
    };

    const requisicao = produtoEditavel
      ? api.put(`/produtos/${produtoEditavel.id}`, dados)
      : api.post('/produtos', dados);

    requisicao
      .then(() => {
        alert(produtoEditavel ? 'Produto atualizado!' : 'Produto cadastrado!');
        setNome('');
        setPreco('');                                      
        setCategoriaId(0);
        onSave();
        if (produtoEditavel) onCancelEdit();
      })
      .catch(err => console.error('Erro ao salvar produto:', err));
  };

  return (
    <form onSubmit={handleSubmit} className="produto-form">
      <h2>{produtoEditavel ? 'Editar Produto' : 'Cadastrar Produto'}</h2>

      <label>Nome:</label><br />
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      /><br />

      <label>Preço:</label><br />
      <input
        type="number"
        value={preco}                              
        onChange={(e) => setPreco(e.target.value)}
        required
      /><br />

      <label>Categoria:</label><br />
      <select
        value={categoriaId}
        onChange={(e) => setCategoriaId(Number(e.target.value))}
        onFocus={() => {
          api.get<Categoria[]>('/categorias').then(res => setCategorias(res.data));
        }}
        required
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map(c => (
          <option key={c.id} value={c.id}>{c.nome}</option>
        ))}
      </select><br /><br />


      <button type="submit">
        {produtoEditavel ? 'Atualizar' : 'Cadastrar'}
      </button>

      {/* Botão de cancelar edição */}
      {produtoEditavel && (
        <button
          type="button"
          onClick={onCancelEdit}
          style={{ marginLeft: '10px', backgroundColor: '#aaa' }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
