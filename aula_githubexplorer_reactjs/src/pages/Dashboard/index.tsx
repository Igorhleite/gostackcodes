import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Title, Form, Repositories, Error, UserRepositories } from './styles';
import logoImg from '../../assets/Logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface RepositiryUser {
  name: string;
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem(
      '@GitHubExplorer:repositories',
    );

    if (storedRepositories) {
      return JSON.parse(storedRepositories);
    }
    return [];
  });
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [newDrop, setNewDrop] = useState('');
  const [listRepo, setListRepo] = useState<RepositiryUser[]>([]);

  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
      setNewDrop('');
    } catch (err) {
      setInputError('Repositório não existe!');
    }
  }

  async function funcao(
    event: React.KeyboardEvent<HTMLInputElement>,
  ): Promise<void> {
    if (event.keyCode === 81) {
      try {
        const response = await api.get(`users/${newRepo}/repos`);
        const repositoryUser = response.data;
        setNewDrop('exite');
        setListRepo(repositoryUser);
        console.log(repositoryUser);
      } catch (err) {
        setInputError('Nome de usuário incorreto');
      }
    } else if (event.keyCode === 8) {
      setInputError('');
      setNewDrop('');
    }
  }

  return (
    <>
      <img src={logoImg} alt="GitHub Logo" />
      <Title> Explore repositories on Github </Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          onKeyDown={funcao}
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Enter the name as 'user/repository'"
        />
        <button type="submit"> Add Repository </button>
      </Form>
      {newDrop && (
        <UserRepositories>
          <>
            <strong>User Repositories</strong>
            <div>
              {listRepo.map(repositoryUser => (
                // eslint-disable-next-line react/button-has-type
                <button
                  onClick={() => {
                    const aux = `${newRepo}${repositoryUser.name}`;
                    setNewRepo(aux);
                    setNewDrop('');
                  }}
                >
                  <p>{repositoryUser.name}</p>
                </button>
              ))}
              <span />
            </div>
          </>
        </UserRepositories>
      )}

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
