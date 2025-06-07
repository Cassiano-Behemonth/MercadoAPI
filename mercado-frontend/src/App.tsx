import React from 'react';
import ProdutoList from './components/ProdutoList';
import ProdutoForm from './components/ProdutoForm';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <ProdutoForm />
      <hr />
      <ProdutoList />
    </div>
  );
}

export default App;