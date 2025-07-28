import { useState, useEffect } from 'react';
import styles from "./aboutUs.module.css";
import SliderSection from './components/sliderSection';
import ValuesCards from './components/ValuesCards';
import TeamSection from './components/TeamSection';
import FooterSection from './components/FooterSection';

/* imagens importadas */
import slide1 from './assets/slide1.jpg';
import slide2 from './assets/slide2.jpg';
import slide3 from './assets/slide3.jpg';
import larissaTaxad from './assets/larisaTaxad.png';
import cleitonAssis from './assets/cleitonAssis.png';
import jairMessiano from './assets/jairMessiano.png';
import logo from './assets/logo.png';
import userIcon from './assets/userIcon.png';

const colaboradores = [
  {
    nome: "Cleiton Assis Pinto",
    idade: 25,
    cargo: "Auxiliar de cuidador de idosos",
    email: "cleiton.assis@gmail.com",
    imagem: cleitonAssis
  },
  {
    nome: "Larissa Taxad",
    idade: 27,
    cargo: "Auxiliar de vida sênior",
    email: "larissataxad@gmail.com",
    imagem: larissaTaxad
  },
  {
    nome: "Jair Messiano",
    idade: 40,
    cargo: "Cuidador de idosos sênior",
    email: "jair.messiano@gmail.com",
    imagem: jairMessiano
  },
];

function AboutUs() {
  const imagens = [slide1, slide2, slide3];
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Recupera os dados do usuário do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <header className={styles.menuSuperior}>
        <div className={styles.divMenu}>
          <a href="/"><img src={logo} alt="logo do menu" style={{height: "56px"}}/></a>
          
          <div className={styles.userArea}>
            {userData ? (
              <>
                <span className={styles.userName}>{userData.name}</span>
                <span className={styles.userType}>
                  {userData.type === 'responsavel' ? 'Responsável' : 'Funcionário'}
                </span>
                <a href="/list"><img src={userIcon} alt="logo de user"/></a>
              </>
            ) : (
              <a href="/login"><img src={userIcon} alt="Ícone do usuário" className={styles.userIcon} /></a>
            )}
          </div>
        </div>
      </header>
      <SliderSection imagens={imagens} />
      <ValuesCards />
      <TeamSection colaboradores={colaboradores} />
      <FooterSection />
    </>
  );
}

export default AboutUs;