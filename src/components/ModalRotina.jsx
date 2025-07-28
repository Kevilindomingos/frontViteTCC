import { useState, useEffect } from 'react';
import { api } from '../api/api';
import styles from './ModalRotina.module.css';

const formatarDadosRotina = (dados) => {
  if (!dados) return null;
  return dados.split(' ').map((item, index) => (
    <span key={index}>
      {item}
      {item.startsWith('') && ' '}
    </span>
  ));
};

const ModalRotina = ({ idoso, onFechar }) => {
  const [rotinas, setRotinas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarRotinas = async () => {
      try {
        setCarregando(true);
        setErro(null);
        const response = await api.get(`/list/${idoso.id}/dailyList`);
        setRotinas(response.data);
      } catch (error) {
        console.error("Erro ao buscar rotinas:", error);
        setErro("Erro ao carregar as rotinas diárias");
      } finally {
        setCarregando(false);
      }
    };

    if (idoso) {
      buscarRotinas();
    }

    return () => {
      setRotinas([]);
    };
  }, [idoso]);

  return (
    <div className={styles.fundoModal}>
      <div className={styles.conteudoModal}>
        <button className={styles.botaoFechar} onClick={onFechar}>×</button>
        
        {carregando ? (
          <p>Carregando rotinas...</p>
        ) : erro ? (
          <p className={styles.erro}>{erro}</p>
        ) : rotinas.length === 0 ? (
          <p>Nenhuma rotina registrada para este idoso.</p>
        ) : (
          <div className={styles.containerRotinas}>
            {rotinas.map((rotina, index) => (
              <div key={index} className={styles.cardRotina}>
                <h4>Registro do Dia {index + 1} - {idoso.name}</h4>

                <div className={styles.gridRotina}>
                  <div className={styles.itemRotina}>
                    <span className={styles.rotuloRotina}>Refeições:</span>
                    <div className={styles.valorRotina}>
                      {formatarDadosRotina(rotina.horaRefeicao)}
                    </div>
                  </div>
                  <div className={styles.itemRotina}>
                    <span className={styles.rotuloRotina}>Medicamentos:</span>
                    <div className={styles.valorRotina}>
                      {formatarDadosRotina(rotina.medicamentos)}
                    </div>
                  </div>
                  <div className={styles.itemRotina}>
                    <span className={styles.rotuloRotina}>Atividades:</span>
                    <div className={styles.valorRotina}>
                      {formatarDadosRotina(rotina.atvRealizadas)}
                    </div>
                  </div>
                  <div className={styles.itemRotina}>
                    <span className={styles.rotuloRotina}>Humor:</span>
                    <div className={styles.valorRotina}>
                      {rotina.humorGeral || 'Não informado'}
                    </div>
                  </div>
                  <div className={styles.itemRotina}>
                    <span className={styles.rotuloRotina}>Higiene:</span>
                    <div className={styles.valorRotina}>
                      {formatarDadosRotina(rotina.higienePessoal)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalRotina;