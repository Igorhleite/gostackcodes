import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {


const [repos, setRepos] = useState([]);

useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response);
      setRepos(response.data)
    });
},[])


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: "Repourl",
      techs: "repotechs",
      });  
      const repo = response.data;

      setRepos([...repos, repo])
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    await api.delete(`repositories/${id}`)
    const attRepos = repos.filter(repo => repo.id !== id); // Lógica utilizada: atraves do filtro verifico todos os arrays que possuem o repo.id diferente do id a ser excluido. -> EXCLUSÃO (Logica)
    setRepos(attRepos);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => 
        <li key={repo.id}>
        {repo.title}

        <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
        </button>        
        </li>)}
      
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;


