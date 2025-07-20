import { Menu } from "./components/menu";
import styles from "./aboutUs.module.css"
import { useEffect, useState, useRef } from 'react';
import slide1 from './assets/slide1.jpg';
import slide2 from './assets/slide2.jpg';
import slide3 from './assets/slide3.jpg';

import logoMissao from './assets/logoMissao.png'
import logoValor from './assets/logoValor.png'
import logoFilosofia from './assets/logoFilosofia.png'
import logo from './assets/logo.png'
import userIcon from './assets/userIcon.png'
import logoWhats from './assets/logoWhats.png'
import logoInsta from './assets/logoInsta.png'
import logoFace from './assets/logoFace.png'


function AboutUs() {

  const [ativo, setAtivo] = useState(null);

  const toggleCard = (indice) => {
    setAtivo(ativo === indice ? null : indice);
  };

const imagens = [slide1, slide2, slide3];

  const [itemAtivo, setItemAtivo] = useState(0);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);

  const total = imagens.length;

  useEffect(() => {
    iniciarAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    ajustarScrollMiniatura();
  }, [itemAtivo]);

  const iniciarAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setItemAtivo((prev) => (prev + 1) % total);
    }, 5000);
  };

  const pausarAutoSlide = () => clearInterval(intervalRef.current);

  const irParaAnterior = () => {
    setItemAtivo((prev) => (prev - 1 + total) % total);
  };

  const irParaProximo = () => {
    setItemAtivo((prev) => (prev + 1) % total);
  };

  const ajustarScrollMiniatura = () => {
    const thumbnails = thumbnailRef.current?.children;
    const ativo = thumbnails?.[itemAtivo];
    if (ativo) {
      const container = thumbnailRef.current;
      const center = ativo.offsetLeft - container.offsetWidth / 2 + ativo.offsetWidth / 2;
      container.scrollTo({ left: center, behavior: 'smooth' });
    }
  };

  const detectarSwipe = () => {
    let startX = 0;
    let endX = 0;

    const touchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const touchEnd = (e) => {
      endX = e.changedTouches[0].clientX;
      const dif = endX - startX;
      if (dif > 50) irParaAnterior();
      else if (dif < -50) irParaProximo();
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('touchstart', touchStart, { passive: true });
      slider.addEventListener('touchend', touchEnd, { passive: true });
    }

    return () => {
      slider.removeEventListener('touchstart', touchStart);
      slider.removeEventListener('touchend', touchEnd);
    };
  };

  useEffect(() => {
    return detectarSwipe();
  }, []);


 return(
    <>
    {/* menu */}
    <section id="home" className={styles.slider}>
        <div
      className={styles.slider}
      ref={sliderRef}
      onMouseEnter={pausarAutoSlide}
      onMouseLeave={iniciarAutoSlide}
    >
      <div
  className={styles.list}
  style={{ transform: `translateX(-${itemAtivo * 100}%)` }}
>
  {imagens.map((img, index) => (
    <div key={index} className={styles.item}>
      <img src={img} alt={`Slide ${index + 1}`} loading="lazy" />
    </div>
  ))}
</div>

      <div className={styles.buttons}>
        <button id="prev" onClick={irParaAnterior} className={styles.prev}>❮</button>
        <button id="next" onClick={irParaProximo} className={styles.next}>❯</button>
      </div>

      <div className={styles.thumbnail} ref={thumbnailRef}>
        {imagens.map((img, index) => (
          <div
            key={index}
            className={`${styles.item} ${index === itemAtivo ? styles.active : ''}`}
            onClick={() => setItemAtivo(index)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
    </section>

{/* cards de Valores */}
    <section className={styles.cards}>
      {[
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
      ].map((card, i) => (
        <div key={i}>
          <div className={styles.card} onClick={() => toggleCard(i)}>
            <img src={card.imagem} alt="Imagem" className={styles.cardImg} />
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

    <div className={styles.card}>
      <img src={logoMissao} alt="Imagem" className={styles.cardImg} />
      <div className={styles.cardTexto}>
        <h3>Missão</h3>
      </div>
    </div>
    
    <div className={styles.card}>
      <img src={logoValor} alt="Imagem" className={styles.cardImg} />
      <div className={styles.cardTexto}>
        <h3>Valores</h3>
        
      </div>
    </div>
      
    <div className={styles.card}>
      <img src={logoFilosofia} alt="Imagem" className={styles.cardImg} />
      <div className={styles.cardTexto}>
        <h3>Filosofia</h3>
      </div>
    </div>
    </section>
    {/* texto da section */}
    <div className={styles.tituloS2}>
      <h5>CONHEÇA NOSSOS COLABORADORES</h5>
    </div>
    {/* cards de colaboradores */}
    <section className={styles.funcionarios}>
        <div className={styles.cardFunc}>
      <img src={userIcon} alt="Imagem" className={styles.cardImgFunc} />
      <div className={styles.cardTextoFunc}>
        <h3 className={styles.ttFunc}>Cleiton Assis Pinto</h3>
      </div>
    </div>

    <div className={styles.cardFunc}>
      <img src={userIcon} alt="Imagem" className={styles.cardImgFunc} />
      <div className={styles.cardTextoFunc}>
        <h3 className={styles.ttFunc}>Larissa Taxad</h3>
      </div>
    </div>

    <div className={styles.cardFunc}>
      <img src={userIcon} alt="Imagem" className={styles.cardImgFunc} />
      <div className={styles.cardTextoFunc}>
        <h3 className={styles.ttFunc}>Jair Messiano</h3>
      </div>
    </div>
    </section>


    <footer className={styles.contact}>
  <div className={styles.footerLeft}>
    <img src={logo} alt="foto logo footer" />
  </div>

  <div className={styles.footerRight}>
    <h2>GRAND CLUB <br /> BLUE ROMA</h2>
    <h4><span>TELEFONE:</span> <a className={styles.numero} target="blank" href="https://www.google.com/search?q=GRAND+CLUB+BLUE+ROMA+RESIDENCIAL&rlz=1C1GCEB_pt-PTBR1168BR1168&sourceid=chrome&ie=UTF-8">(41) 99850-3482</a></h4>
    <h4><span>EMAIL:</span> scarpincontabil@gmail.com</h4>
    <h4>
      <span>ENDEREÇO:</span> <a className={styles.endereco} target="blank" href="https://maps.app.goo.gl/D92bPbnHyWaN2u4HA">RUA LUIZ BOZA, 432 - BUTIATUVINHA, <br />
      CURITIBA - PR, 82400-100</a>
    </h4>
  </div>
  <div className={styles.sociais}>
    <a className={styles.iconRedes} target="blank" href="whatsapp.com.br"><img src={logoWhats} alt="" /></a>
    <a className={styles.iconRedes} target="blank" href="instagram.com.br"><img src={logoInsta} alt="" /></a>
    <a className={styles.iconRedes} target="blank" href="facebook.com.br"><img src={logoFace} alt="" /></a>
  </div>
</footer>
</>
 )
}
export default AboutUs