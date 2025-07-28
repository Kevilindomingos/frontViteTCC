import { useState } from 'react';
import styles from './ValuesCards.module.css';
import logoMissao     from '../assets/logoMissao.png';
import logoValor      from '../assets/logoValor.png';
import logoFilosofia  from '../assets/logoFilosofia.png';

const ValuesCards = () => {
  const [ativo, setAtivo] = useState(null);

  const toggleCard = (indice) => {
    setAtivo(ativo === indice ? null : indice);
  };

  const cardsData = [
    {
      titulo: 'Missão',
      imagem: logoMissao,
      texto: 'Oferecer cuidado humanizado e acolhimento seguro para que os idosos vivam com qualidade, autonomia e bem-estar.'
    },
    {
      titulo: 'Valores',
      imagem: logoValor,
      texto: 'Valorizamos profundamente o respeito à individualidade de cada pessoa, reconhecendo suas histórias, preferências e necessidades únicas.'
    },
    {
      titulo: 'Filosofia',
      imagem: logoFilosofia,
      texto: 'Oferecer cuidado humanizado e acolhimento seguro para que os idosos vivam com qualidade, autonomia e bem-estar.'
    },
  ];

   return (
    <section className={styles.cards}>
      {cardsData.map((card, i) => (
        <div key={i} className={styles.cardContainer}>
          <div className={styles.card} onClick={() => toggleCard(i)}>
            <img src={card.imagem} alt={card.titulo} className={styles.cardImg} />
            <div className={styles.cardTexto}>
              <h3>{card.titulo}</h3>
            </div>
          </div>

          {ativo === i && (
            <div className={styles.cardComplemento}>
              <p>{card.texto}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default ValuesCards;