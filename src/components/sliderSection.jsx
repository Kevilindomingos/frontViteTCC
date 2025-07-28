import { useEffect, useRef, useState } from 'react';
import styles from './SliderSection.module.css';

const SliderSection = ({ imagens }) => {
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

  return (
    <section id="home" className={styles.slider}>
      <div className={styles.sliderContainer} ref={sliderRef} onMouseEnter={pausarAutoSlide} onMouseLeave={iniciarAutoSlide}>

        <div className={styles.list} style={{ transform: `translateX(-${itemAtivo * 100}%)` }}>
          {imagens.map((img, index) => (
            <div key={index} className={styles.item}>
              <img src={img} alt={`Slide ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        <div className={styles.thumbnail} ref={thumbnailRef}>
          {imagens.map((img, index) => (
            <div key={index} className={`${styles.item} ${index === itemAtivo ? styles.active : ''}`} onClick={() => setItemAtivo(index)}>
              <img src={img} alt={`Thumbnail ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        <div className={styles.textoSlider}>
          <h4>
            Grand Club Florença é uma empresa especializada no cuidado e bem-estar de idosos, fundada em 14 de março de 2023.
            Desde sua criação, a instituição tem como missão oferecer um ambiente seguro, acolhedor e humanizado para a terceira idade,
            priorizando a qualidade de vida, a autonomia e o respeito à individualidade de cada residente.
          </h4>
        </div>
      </div>
    </section>
  );
};

export default SliderSection;