/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { api } from './api/api'
import { Menu } from './components/menu'
import styles from './list.module.css'
import userIcon from './assets/userIcon.png'

function List() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedElder, setSelectedElder] = useState(null)
  const [dailyRoutines, setDailyRoutines] = useState([])
  const [loadingRoutines, setLoadingRoutines] = useState(false)

  // Busca a lista de idosos
  useEffect(() => {
    async function fetchList() {
      try { 
        const response = await api.get('/list')
        setList(response.data)
      } catch (error) {
        setError("Erro ao carregar listas", error)
      } finally {
        setLoading(false)
      }
    }
    fetchList()
  }, [])

  // Função para abrir o modal e buscar as rotinas do idoso específico
  const openModal = async (elder) => {
    setSelectedElder(elder)
    setLoadingRoutines(true)
    setModalOpen(true)
    
    try {
      const response = await api.get(`/list/${elder.id}/dailyList`)
      setDailyRoutines(response.data)
    } catch (error) {
      console.error("Erro ao buscar rotinas:", error)
      setDailyRoutines([])
    } finally {
      setLoadingRoutines(false)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedElder(null)
    setDailyRoutines([])
  }

  // Função para formatar os dados com quebras de linha
  const formatRoutineData = (data) => {
    return data.split(' ').map((item, index) => (
      <span key={index}>
        {item}
        {item.endsWith('h') && <br />}
      </span>
    ))
  }

  if (loading) return <p>Carregando listas...</p>
  if (error) return <p>{error}</p>
  
  return ( 
    <>
      <section className={styles.fundo}>
        <Menu/>
        <div className={styles.cardIdoso}>
          <h2 className={styles.ttCard}>Lista de idosos</h2>
          <ol className={styles.cardPrincipal}>
            {list.map((item) => (
              <ul key={item.id}>
                <img src={item.image} alt={item.name} />
                <p>{item.bornAge}</p>
                <strong>{item.name}</strong> 
                <p>Quarto: {item.roomNumber}</p>
                <button>
                  <img src={userIcon} alt="icone do cuidador" style={{height: '32px', width: '32px'}} /> 
                  {item.caregiverName}
                </button>
                <button onClick={() => openModal(item)}>Visualizar Rotina</button>
              </ul>
            ))}
          </ol>
        </div>
      </section>

      {/* Modal de Rotina Diária */}
      {modalOpen && selectedElder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            <h3>Rotina Diária de {selectedElder.name}</h3>
            
            {loadingRoutines ? (
              <p>Carregando rotinas...</p>
            ) : dailyRoutines.length === 0 ? (
              <p>Nenhuma rotina registrada para este idoso.</p>
            ) : (
              <div className={styles.routineContainer}>
                {dailyRoutines.map((routine, index) => (
                  <div key={index} className={styles.routineCard}>
                    <h4>Registro do Dia {index + 1}</h4>
                    <div className={styles.routineGrid}>
                      <div className={styles.routineItem}>
                        <span className={styles.routineLabel}>Refeições:</span>
                        <div className={styles.routineValue}>
                          {formatRoutineData(routine.horaRefeicao)}
                        </div>
                      </div>
                      <div className={styles.routineItem}>
                        <span className={styles.routineLabel}>Medicamentos:</span>
                        <div className={styles.routineValue}>
                          {formatRoutineData(routine.medicamentos)}
                        </div>
                      </div>
                      <div className={styles.routineItem}>
                        <span className={styles.routineLabel}>Atividades:</span>
                        <div className={styles.routineValue}>
                          {formatRoutineData(routine.atvRealizadas)}
                        </div>
                      </div>
                      <div className={styles.routineItem}>
                        <span className={styles.routineLabel}>Humor:</span>
                        <div className={styles.routineValue}>
                          {routine.humorGeral}
                        </div>
                      </div>
                      <div className={styles.routineItem}>
                        <span className={styles.routineLabel}>Higiene:</span>
                        <div className={styles.routineValue}>
                          {formatRoutineData(routine.higienePessoal)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default List