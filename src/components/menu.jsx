import { useNavigate } from "react-router";
import styles from "./Menu.module.css"
import { useState } from "react";

import { AlignJustify } from "lucide-react";

export const Menu = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const goToMain = () => navigate('/AboutUs')
    const goToInfo = () => navigate('/List')
    const goToDaily = () => navigate('/DailyList')


    const logOut = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

 return(
    <nav className={open ? styles.navBar : styles.navBarClosed}>
        <img src={AlignJustify} onClick={() => setOpen(prev => !prev)} />
        <p onClick={goToMain}>Main</p>
        <p>Criar usuário</p>
        <p onClick={goToInfo}>Lista de Idosos</p>
        <p>Criar produto</p>
        <p onClick={goToDaily}>Lista de produto</p>
        <p onClick={logOut}>Sair</p>
    </nav>
 )
}