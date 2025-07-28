import { useState } from 'react';
import styles from './TeamSection.module.css';
import userIcon       from '../assets/userIcon.png';

const TeamSection = ({ colaboradores }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState(null);

  const abrirModal = (colab) => {
    setColaboradorSelecionado(colab);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setColaboradorSelecionado(null);
  };

  return (
    <>
      <div className={styles.tituloS2}>
        <h5>CONHEÇA NOSSOS COLABORADORES</h5>
      </div>

      <section className={styles.funcionarios}>
        {colaboradores.map((colab, index) => (
          <div key={index} className={styles.cardFunc} onClick={() => abrirModal(colab)}>
            <img src={userIcon} alt="Imagem" className={styles.cardImgFunc} />
            <div className={styles.cardTextoFunc}>
              <h3 className={styles.ttFunc}>{colab.nome}</h3>
            </div>
          </div>
        ))}

        {modalAberto && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button className={styles.fecharModal} onClick={fecharModal}>✕</button>
              <div className={styles.modalBody}>
                <div className={styles.modalEsquerda}>
                  <img src={colaboradorSelecionado.imagem} alt="Foto" className={styles.modalFoto} />
                </div>
                <div className={styles.modalDireita}>
                  <h4 className={styles.textoModal}>{colaboradorSelecionado.nome}</h4>
                  <h4 className={styles.textoModal}>Idade: {colaboradorSelecionado.idade}</h4>
                  <h4 className={styles.textoModal}>Cargo: {colaboradorSelecionado.cargo}</h4>
                  <h4 className={styles.textoModal}>Email: {colaboradorSelecionado.email}</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default TeamSection;