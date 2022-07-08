import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';
import { RepositoryItem } from '../../components/RepositoryItem';
import { CircleNotch } from 'phosphor-react';

type Repository = {
  id: number;
  avatar_url: string;
  login: string;
}

export function Home() {
  const [newInputText, setNewInputText] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const [loading, setLoading] = useState(false);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setNewInputText(event.target.value);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setNewInputText('');

    setLoading(true)

    try {
      const response = await axios.get(`https://api.github.com/users/${newInputText}`)
        .then(response => response);

      setRepositories([...repositories, response.data])

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

  }

  return (
    <div className={styles.homeContainer}>
      <header>
        <img src={logoImg} alt="Logo Github Explorer" />
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Explore repositórios no Github</h1>

        <input 
          type="text" 
          placeholder='Digite aqui'
          value={newInputText}
          onChange={handleChangeInput}
        />
        <button type="submit">
          {loading ? 'Carregando...' : 'Pesquisar'}
        </button>
      </form>

      
      

      <section>
        {repositories.map(repository => {
          return (
            <RepositoryItem key={repository.id} repository={repository}/>
          );
        })}
      </section>
    </div>
  );
}