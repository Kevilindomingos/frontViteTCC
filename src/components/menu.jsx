import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Menu.module.css";

import logo from '../assets/logo.png';
import iconeDL from '../assets/iconeDL.png';
import iconeList from '../assets/iconeList.png';
import iconlogOut from '../assets/log-out.png';

export const Menu = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const typeFromStorage = localStorage.getItem('userType');
        if (typeFromStorage) {
            setUserType(typeFromStorage);
        }
    }, []);

    const goToMain = () => navigate('/AboutUs');
    const goToInfo = () => navigate('/List');
    const goToDaily = () => navigate('/DailyList');

    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        navigate('/');
    };

    return (
        <nav className={styles.navBar}>
            <img onClick={goToMain} src={logo} style={{ height: '74px', width: '55px' }} />
            <img onClick={goToInfo} src={iconeList} style={{ height: '35px', width: '35px' }} />
            {userType !== 'responsavel' && (
                <img onClick={goToDaily} src={iconeDL} style={{ height: '35px', width: '35px' }} />
            )}
            <img onClick={logOut} src={iconlogOut} alt="icone de sair" style={{ height: '35px', width: '35px' }} />
        </nav>
    );
};