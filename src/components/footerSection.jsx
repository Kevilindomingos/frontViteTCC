import styles from './FooterSection.module.css';
import logoWhats      from '../assets/logoWhats.png';
import logoInsta      from '../assets/logoInsta.png';
import logoFace       from '../assets/logoFace.png';
import logo           from '../assets/logo.png';

const FooterSection = () => {
  return (
    <footer className={styles.contact}>
      <div className={styles.footerLeft}>
        <img src={logo} alt="foto logo footer" />
      </div>

      <div className={styles.footerRight}>
        <h2>GRAND CLUB <br /> BLUE ROMA</h2>
        <h4><span>TELEFONE:</span> <a className={styles.numero} target="blank" href="https://www.google.com/search?q=GRAND+CLUB+BLUE+ROMA+RESIDENCIAL&rlz=1C1GCEB_pt-PTBR1168BR1168&sourceid=chrome&ie=UTF-8">(41) 99850-3482</a></h4>
        <h4><span>EMAIL:</span> scarpincontabil@gmail.com</h4>
        <h4><span>ENDEREÇO:</span> <a className={styles.endereco} target="blank" href="https://maps.app.goo.gl/D92bPbnHyWaN2u4HA">RUA LUIZ BOZA, 432 - BUTIATUVINHA, <br />
          CURITIBA - PR, 82400-100</a>
        </h4>
      </div>
      <div className={styles.sociais}>
        <a className={styles.iconRedes} target="blank" href="whatsapp.com.br"><img src={logoWhats} alt="" /></a>
        <a className={styles.iconRedes} target="blank" href="instagram.com.br"><img src={logoInsta} alt="" /></a>
        <a className={styles.iconRedes} target="blank" href="facebook.com.br"><img src={logoFace} alt="" /></a>
      </div>
    </footer>
  );
};

export default FooterSection;