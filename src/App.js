import React, { useEffect, useState } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  // const [title, setTitle] = useState("");
  // const [url, setUrl] = useState("");
  // const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    // const data = {
    //   title,
    //   url,
    //   techs: techs.split(","),
    // };
    const data = {
      id: "123",
      url: "https://github.com/azagatti",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    const response = await api.post("repositories", data);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.find(
      (repository) => repository.id !== id
    );

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      {/* <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />
      <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" />
      <input
        value={techs}
        onChange={(e) => setTechs(e.target.value)}
        type="text"
      /> */}
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
