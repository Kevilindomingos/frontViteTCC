import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Menu.module.css";

import logo from '../assets/logo.png';
import iconeDL from '../assets/iconeDL.png';
import iconeList from '../assets/iconeList.png';
import iconlogOut from '../assets/log-out.png';

export const Menu = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); // Recupera todos os dados do usuário do localStorage
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
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
            {userData && (
                <div className={styles.userArea}>
                    <div className={styles.userInitial}>
                        {userData.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{userData.name}</span>
                        <span className={styles.userType}>
                            {userData.type === 'responsavel' ? 'Responsável' : 'Funcionário'}
                        </span>
                    </div>
                </div>
            )}

            <img onClick={goToMain} src={logo} className={styles.logo} />
            <img onClick={goToInfo} src={iconeList} className={styles.menuIcon} />
            {userData?.type !== 'responsavel' && (
                <img onClick={goToDaily} src={iconeDL} className={styles.menuIcon} />
            )}
            <img onClick={logOut} src={iconlogOut} alt="icone de sair" className={styles.logoutIcon} />
        </nav>
    );
};