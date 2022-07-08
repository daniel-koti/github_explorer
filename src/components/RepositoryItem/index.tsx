import { CaretRight } from 'phosphor-react';
import styles from './styles.module.scss';

type RepositoryItemProps = {
  repository: {
    id: number;
    avatar_url: string;
    login: string;
  }
}

export function RepositoryItem(props: RepositoryItemProps) {
  return (
    <article className={styles.repositoryItemContainer}>
      <div className={styles.repositoryInfo}>
        <img src={props.repository.avatar_url} alt="Avatar URL" />

        <div>
          <strong>{props.repository.login}/repo</strong>
          <span>Descrição do repo</span>
        </div>
      </div>

      <a href="">
        <CaretRight size={20} weight='bold'/>
      </a>
    </article>
  );
}