import React from 'react';
import ProdutoList from './components/ProdutoList';
import CategoriaList from './components/CategoriaList';

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{
        textAlign: 'center',
        color: '#333',
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        Gestão de Produtos e Categorias
      </h1>

      <hr />

      <ProdutoList />

      <hr />

      <CategoriaList />
    </div>
  );
}
