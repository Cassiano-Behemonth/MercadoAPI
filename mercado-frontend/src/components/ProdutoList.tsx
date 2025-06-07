import React, { useEffect, useState } from 'react';
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