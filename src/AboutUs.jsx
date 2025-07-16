/*  */
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Menu } from "./components/menu";
import { api } from  "./api/api"
import styles from "./aboutUs.module.css"

function AboutUs() {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(storedUser) navigate('/AboutUs')
    }, [navigate])

    useEffect(() => {
        async function fechData() {
            try{
                const[usersRes, productRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/list'),
                ])
                setUserCount(usersRes.data.length)
                setProductCount(productRes.data.length)
            }catch(err){
                console.error("erro ao buscar dados do About Us", err)

            }
        }
        fechData()
    }, [])

 return(
    <section>
        <Menu/>
        <div className={styles.wrapNav}>
            <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                <p>Criar Produto</p>
                </div>
            <div className={styles.wrapItem} onClick={() => navigate('/List')}>
                <p>Lista de produtos - ({productCount} produtos)</p>
                </div>
            <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                <p>Criar usuário</p>
                </div>
            <div className={styles.wrapItem} onClick={() => navigate('/DailyList')}>
                <p>Lista de usuários - ({userCount} usuários)</p>
                </div>

        </div>
    </section>

 )
}
export default AboutUs