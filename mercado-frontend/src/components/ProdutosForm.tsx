/*import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Produto, Categoria } from '../types/interfaces';

export default function ProdutoForm() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    api.get<Categoria[]>('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Erro ao carregar categorias:', err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoProduto = {
      nome,
      preco,
      categoriaId,
    };

    api.post('/produtos', novoProduto)
      .then(() => {
        alert('Produto cadastrado com sucesso!');
        setNome('');
        setPreco(0);
        setCategoriaId(0);
      })
      .catch(err => console.error('Erro ao cadastrar produto:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Produto</h2>

      <label>Nome:</label><br />
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required /><br />

      <label>Preço:</label><br />
      <input type="number" value={preco} onChange={(e) => setPreco(Number(e.target.value))} required /><br />

      <label>Categoria:</label><br />
      <select value={categoriaId} onChange={(e) => setCategoriaId(Number(e.target.value))} required>
        <option value="">Selecione uma categoria</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.nome}</option>
        ))}
      </select><br /><br />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
*/

// src/components/ProdutoForm.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Produto, Categoria } from '../types/interfaces';

interface ProdutoFormProps {
  produtoEditavel?: Produto;
  onSave: () => void;
}

export default function ProdutoForm({ produtoEditavel, onSave }: ProdutoFormProps) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    api.get<Categoria[]>('/categorias')
      .then(res => setCategorias(res.data));
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
        onSave(); // recarrega lista
      })
      .catch(err => console.error('Erro ao salvar produto:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{produtoEditavel ? 'Editar Produto' : 'Cadastrar Produto'}</h2>

      <label>Nome:</label><br />
      <input value={nome} onChange={(e) => setNome(e.target.value)} required /><br />

      <label>Preço:</label><br />
      <input type="number" value={preco} onChange={(e) => setPreco(Number(e.target.value))} required /><br />

      <label>Categoria:</label><br />
      <select value={categoriaId} onChange={(e) => setCategoriaId(Number(e.target.value))} required>
        <option value="">Selecione uma categoria</option>
        {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
      </select><br /><br />

      <button type="submit">{produtoEditavel ? 'Atualizar' : 'Cadastrar'}</button>
    </form>
  );
}
