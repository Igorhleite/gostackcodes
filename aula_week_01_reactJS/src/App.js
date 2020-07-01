import React, { useState, useEffect} from 'react'
import api from './services/api'
import './App.css'


import Header from './components/Header'



function App () {

const [projects, setProjects] = useState([]);

useEffect(() => {
        api.get('projects').then(response => {
            console.log(response);
                setProjects(response.data)
        });
        },[]);

async function handleAddProject() {
const response = await api.post('projects', {
    title: `Novo Projeto ${Date.now()}`,
    owner: "igor"
    });

    const project = response.data;

    setProjects([...projects, project])
};

return      <>
     <Header/>

     <ul>
    {projects.map(project => <li key={project.id}>Nome:{project.title}</li>)}
     </ul>
    
    <button type="button" onClick={handleAddProject}> Adicionar Projeto </button>
    </>
}

export default App;
