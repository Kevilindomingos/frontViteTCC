import { useNavigate } from "react-router";
import styles from "./Menu.module.css"
import { useState } from "react";

import logo from '../assets/logo.png'
import iconeDL from '../assets/iconeDL.png'

export const Menu = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const goToMain = () => navigate('/AboutUs')
    const goToInfo = () => navigate('/List')
    const goToDaily = () => navigate('/DailyList')

    /* sair para tela de login */
    const logOut = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

 return(
    <nav className={styles.navBar}>
        <img onClick={goToMain} src={logo} style={{height: '74px', width: '55px'}}/>
        <img onClick={goToInfo} src={iconeDL} style={{height: '35px', width: '35px'}}></img>
        <img onClick={goToDaily} src={iconeDL} style={{height: '35px', width: '35px'}}></img>
        <p onClick={logOut}>Sair</p>
    </nav>
 )
}