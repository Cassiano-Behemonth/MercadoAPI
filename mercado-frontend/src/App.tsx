import React from 'react';
import ProdutoList from './components/ProdutoList';
import CategoriaList from './components/CategoriaList';

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Gestão de Produtos e Categorias</h1>
      <hr />

      <ProdutoList />

      <hr />
      <CategoriaList />
    </div>
  );
}