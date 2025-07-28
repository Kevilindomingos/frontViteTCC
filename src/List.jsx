import { useEffect, useState } from 'react';
import { api } from './api/api';
import { Menu } from './components/menu';
import ListaIdosos from './components/ListaIdosos';
import styles from './list.module.css';

function List() {
  const [idosos, setIdosos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarLista() {
      try { 
        const response = await api.get('/list');
        setIdosos(response.data);
      } catch (error) {
        setErro("Erro ao carregar listas");
        console.error(error);
      } finally {
        setCarregando(false);
      }
    }
    buscarLista();
  }, []);

  return (
    <section className={styles.fundo}>
      <Menu/>
      <ListaIdosos idosos={idosos} carregando={carregando} erro={erro}/>
    </section>
  );
}

export default List;