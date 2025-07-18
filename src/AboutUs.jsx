import { Menu } from "./components/menu";
import styles from "./aboutUs.module.css"
import CarouselBootstrap from "./components/carousel";

function AboutUs() {
 return(
    <>
    {/* menu */}
    <section className={styles.carousel}>
    <div className="App">
      <CarouselBootstrap />
    </div>
    </section>
    <section className={styles.cards}>
    cards missão visão valores
    cards colaboradores
    </section>
    <footer className={styles.contact}>
        contato
    </footer>
</>
 )
}
export default AboutUs