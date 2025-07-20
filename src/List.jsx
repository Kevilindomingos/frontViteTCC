/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { api } from './api/api'
import { Menu } from './components/menu'
import styles from './list.module.css'

function List() {

  const [list, setlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [ error, setError] = useState('')
  

  useEffect(() => {
    async function fetchlist(){
      try{ 
        const response = await api.get('/List')
        setlist(response.data)

      } catch (error){
        setError("Erro ao carregar listas", error)
      } finally {
        setLoading(false)
      }
    }
    fetchlist()

  }, [])

   if(loading) return <p>Carregando listas...</p>
    if(error) return <p>{error}</p>

  return ( 
    <>
    <section className={styles.fundo}>
      <Menu/>
      <div className={StyleSheet.cardIdoso}>
      <ol>{list.map((item) => (
        <ul key={item.id}>
          <img src={item.image} style={{height: "61px"}}/>
          <strong>{item.name}</strong>
          <p>{item.bornAge}</p>
          <p>Quarto: {item.roomNumber}</p>
          <p>Especificações: {item.especialConditions}</p>
          <button>Visualizar Lista de rotina</button>
          <p>Cuidador(a) responsável</p>
          <button>Larissa Taxad</button>
        </ul>
      ))}
        </ol>
    </div>
    </section>
    </>
  )
}

export default List