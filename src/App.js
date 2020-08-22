import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(()=>{
    // Busca as listas da API
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
   const newRepo = await api.post('repositories', {
     title: 'Novo Projeto',
     url: 'http://novoprojeto.dev',
     techs: ['Node.Js', 'ReatcJS']
   });
   setRepositories([...repositories, newRepo.data]); // Atualiza lista de repositórios
   return newRepo;
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`); // Deleta repositório da API

    setRepositories(repositories.filter(repository=> repository.id !== id)) // Exibie somente os repositórios que não foi o deletado
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=> (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
