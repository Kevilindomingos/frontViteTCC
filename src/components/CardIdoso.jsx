import styles from './CardIdoso.module.css';
import userIcon from '../assets/userIcon.png';

const CardIdoso = ({ idoso, onVisualizarRotina }) => {
  return (
    <div className={styles.card}>
      <img src={idoso.image} alt={idoso.name} className={styles.fotoIdoso} />
      <div className={styles.infoContainer}>
        <strong>{idoso.name}</strong>
        <p>{idoso.bornAge}</p>
        <p>Quarto: {idoso.roomNumber}</p>
      </div>
      <button className={styles.botaoCuidador}>
        <img src={userIcon} alt="Ícone do cuidador" className={styles.iconeCuidador} />
        Cuidador: {idoso.caregiverName}
      </button>
      <button className={styles.botaoRotina} onClick={onVisualizarRotina}>
        Visualizar Rotina
      </button>
    </div>
  );
};

export default CardIdoso;