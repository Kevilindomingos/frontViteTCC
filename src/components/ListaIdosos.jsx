import { useState } from 'react';
import CardIdoso from './CardIdoso';
import ModalRotina from './ModalRotina';
import styles from './ListaIdosos.module.css';
import { api } from '../api/api'; 

const ListaIdosos = ({ idosos, carregando, erro }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [idosoSelecionado, setIdosoSelecionado] = useState(null);
  const [rotinasDiarias, setRotinasDiarias] = useState([]);
  const [carregandoRotinas, setCarregandoRotinas] = useState(false);

  const abrirModal = async (idoso) => {
    setIdosoSelecionado(idoso);
    setCarregandoRotinas(true);
    setModalAberto(true);
    
    try {
      const response = await api.get(`/list/${idoso.id}/dailyList`);
      setRotinasDiarias(response.data);
    } catch (error) {
      console.error("Erro ao buscar rotinas:", error);
      setRotinasDiarias([]);
    } finally {
      setCarregandoRotinas(false);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setIdosoSelecionado(null);
    setRotinasDiarias([]);
  };

  if (carregando) return <p>Carregando listas...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className={styles.cardIdoso}>
      <h2 className={styles.tituloCard}>Lista de idosos</h2>
      <div className={styles.listaContainer}>
        {idosos.map((idoso) => (
          <CardIdoso  key={idoso.id} idoso={idoso} onVisualizarRotina={() => abrirModal(idoso)} />
        ))}
      </div>

      {modalAberto && idosoSelecionado && (
         <ModalRotina  idoso={idosoSelecionado} onFechar={fecharModal} />
      )}
    </div>
  );
};

export default ListaIdosos;