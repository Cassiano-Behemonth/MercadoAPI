/*import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Produto } from '../types/interfaces';

export default function ProdutoList() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    api.get<Produto[]>('/produtos')
      .then(res => setProdutos(res.data))
      .catch(err => console.error('Erro ao buscar produtos:', err));
  }, []);

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {produtos.map(prod => (
          <li key={prod.id}>
            {prod.nome} - R$ {prod.preco.toFixed(2)} ({prod.categoria?.nome})
          </li>
        ))}
      </ul>
    </div>
  );
}
*/

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Produto } from '../types/interfaces';
import ProdutoForm from './ProdutoForm';

export default function ProdutoList() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoEditavel, setProdutoEditavel] = useState<Produto | undefined>(undefined);

  const carregarProdutos = () => {
    api.get<Produto[]>('/produtos')
      .then(res => setProdutos(res.data));
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleExcluir = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      api.delete(`/produtos/${id}`)
        .then(() => {
          alert('Produto excluído!');
          carregarProdutos();
        });
    }
  };

  return (
    <div>
      <ProdutoForm produtoEditavel={produtoEditavel} onSave={carregarProdutos} />
      <hr />
      <h2>Lista de Produtos</h2>
      <ul>
        {produtos.map(prod => (
          <li key={prod.id}>
            <strong>{prod.nome}</strong> - R$ {prod.preco.toFixed(2)} ({prod.categoria?.nome})
            <button onClick={() => setProdutoEditavel(prod)}>Editar</button>
            <button onClick={() => handleExcluir(prod.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
