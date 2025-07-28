import styles from './dailyList.module.css'
import { useEffect, useState } from 'react'
import { api } from './api/api'
import { Menu } from './components/menu'
import { useNavigate, useParams } from 'react-router'

function DailyList() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [lists, setLists] = useState([])
  const [idosos, setIdosos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editListId, setEditListId] = useState(null)
  const [selectedListId, setSelectedListId] = useState('')
  const [selectedIdosoId, setSelectedIdosoId] = useState('')

  const [editData, setEditData] = useState({
    horaRefeicao: '',
    medicamentos: '',
    atvRealizadas: '',
    humorGeral: '',
    higienePessoal: ''
  })

  const [newData, setNewData] = useState({
    horaRefeicao: '',
    medicamentos: '',
    atvRealizadas: '',
    humorGeral: '',
    higienePessoal: ''
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) navigate('/')
  }, [navigate])

  const fetchLists = async () => {
    try {
      const responseRotinas = id
        ? await api.get(`/list/${id}/dailyList`)
        : await api.get('/dailyList')
      setLists(responseRotinas.data)

      const responseIdosos = await api.get('/list')
      setIdosos(responseIdosos.data)
    } catch (err) {
      console.error(err)
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLists()
  }, [id])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/dailyList/${id}`)
      setLists(lists.filter((u) => u.id !== id))
      if (editListId === id || selectedListId === String(id)) {
        setEditListId(null)
        setSelectedListId('')
      }
    } catch (err) {
      setError('Erro ao deletar a rotina')
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData({ ...editData, [name]: value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/dailyList/${editListId}`, editData)
      setEditListId(null)
      setSelectedListId('')
      fetchLists()
    } catch (err) {
      console.error(err)
      setError('Erro ao atualizar a rotina')
    }
  }

  const handleSelectChange = (e) => {
    const idSelecionado = e.target.value
    setSelectedListId(idSelecionado)

    const rotinaSelecionada = lists.find(
      (list) => list.id === parseInt(idSelecionado)
    )

    if (rotinaSelecionada) {
      setEditListId(rotinaSelecionada.id)
      setEditData({
        horaRefeicao: rotinaSelecionada.horaRefeicao,
        medicamentos: rotinaSelecionada.medicamentos,
        atvRealizadas: rotinaSelecionada.atvRealizadas,
        humorGeral: rotinaSelecionada.humorGeral,
        higienePessoal: rotinaSelecionada.higienePessoal
      })
    }
  }

  const handleNewChange = (e) => {
    const { name, value } = e.target
    setNewData({ ...newData, [name]: value })
  }

  const handleNewSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!selectedIdosoId) {
        alert('Por favor, selecione um idoso.')
        return
      }

      await api.post(`/list/${selectedIdosoId}/dailyList`, newData)

      setNewData({
        horaRefeicao: '',
        medicamentos: '',
        atvRealizadas: '',
        humorGeral: '',
        higienePessoal: ''
      })
      setSelectedIdosoId('')
      fetchLists()
    } catch (err) {
      console.error(err)
      setError('Erro ao criar nova rotina')
    }
  }

  if (loading) return <p className={styles.mensagemCarregando}>Carregando rotinas...</p>
  if (error) return <p className={styles.mensagemErro}>{error}</p>

  return (
    <div className={styles.container}>
      <section>
        <Menu />
        <div className={styles.secao}>
          <h1 className={styles.tituloPrincipal}>Rotinas dos Idosos</h1>

          {/* CRIAÇÃO */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Criar Nova Rotina</h2>
            <form onSubmit={handleNewSubmit} className={styles.formulario}>
              <div className={styles.grupoInput}>
                <label>
                  Idoso:
                  <select
                    value={selectedIdosoId}
                    onChange={(e) => setSelectedIdosoId(e.target.value)}
                    required
                  >
                    <option value="">Selecione um idoso</option>
                    {idosos.map((idoso) => (
                      <option key={idoso.id} value={idoso.id}>
                        {`${idoso.id} - ${idoso.name}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              
              <div className={styles.grupoInput}>
                <input
                  type="text"
                  name="horaRefeicao"
                  value={newData.horaRefeicao}
                  onChange={handleNewChange}
                  placeholder="Hora da refeição"
                  required
                />
              </div>
              
              <div className={styles.grupoInput}>
                <input
                  type="text"
                  name="medicamentos"
                  value={newData.medicamentos}
                  onChange={handleNewChange}
                  placeholder="Medicamentos"
                  required
                />
              </div>
              
              <div className={styles.grupoInput}>
                <input
                  type="text"
                  name="atvRealizadas"
                  value={newData.atvRealizadas}
                  onChange={handleNewChange}
                  placeholder="Atividades realizadas"
                  required
                />
              </div>
              
              <div className={styles.grupoInput}>
                <input
                  type="text"
                  name="humorGeral"
                  value={newData.humorGeral}
                  onChange={handleNewChange}
                  placeholder="Humor geral"
                  required
                />
              </div>
              
              <div className={styles.grupoInput}>
                <input
                  type="text"
                  name="higienePessoal"
                  value={newData.higienePessoal}
                  onChange={handleNewChange}
                  placeholder="Higiene pessoal"
                  required
                />
              </div>
              
              <button type="submit" className={styles.botao}>Criar rotina</button>
            </form>
          </div>

          {/* SELECIONAR */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Selecionar rotina para editar ou visualizar</h2>
            <div className={styles.grupoInput}>
              <select
                onChange={handleSelectChange}
                value={selectedListId}
              >
                <option value="">Selecione...</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {`Rotina ${list.id} - ${list.horaRefeicao}`}
                  </option>
                ))}
              </select>
            </div>

            {/* EDIÇÃO */}
            {editListId && (
              <form
                onSubmit={handleUpdate}
                className={styles.formulario}
              >
                <div className={styles.grupoInput}>
                  <input
                    type="text"
                    name="horaRefeicao"
                    value={editData.horaRefeicao}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                
                <div className={styles.grupoInput}>
                  <input
                    type="text"
                    name="medicamentos"
                    value={editData.medicamentos}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                
                <div className={styles.grupoInput}>
                  <input
                    type="text"
                    name="atvRealizadas"
                    value={editData.atvRealizadas}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                
                <div className={styles.grupoInput}>
                  <input
                    type="text"
                    name="humorGeral"
                    value={editData.humorGeral}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                
                <div className={styles.grupoInput}>
                  <input
                    type="text"
                    name="higienePessoal"
                    value={editData.higienePessoal}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                
                <div className={styles.grupoBotoes}>
                  <button type="submit" className={styles.botao}>Salvar alterações</button>
                  <button
                    type="button"
                    className={`${styles.botao} ${styles.botaoSecundario}`}
                    onClick={() => {
                      setEditListId(null)
                      setSelectedListId('')
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {/* VISUALIZAR APENAS A ROTINA SELECIONADA */}
            {selectedListId && (
              <div className={styles.rotinaSelecionada}>
                {lists
                  .filter((list) => list.id === parseInt(selectedListId))
                  .map((list) => (
                    <div key={list.id}>
                      <p className={styles.itemRotina}><strong>Hora da Refeição:</strong> {list.horaRefeicao}</p>
                      <p className={styles.itemRotina}><strong>Medicamentos:</strong> {list.medicamentos}</p>
                      <p className={styles.itemRotina}><strong>Atividades Realizadas:</strong> {list.atvRealizadas}</p>
                      <p className={styles.itemRotina}><strong>Humor Geral:</strong> {list.humorGeral}</p>
                      <p className={styles.itemRotina}><strong>Higiene Pessoal:</strong> {list.higienePessoal}</p>
                      <div className={styles.grupoBotoes}>
                        <button className={`${styles.botao} ${styles.botaoSecundario}`}
                          onClick={() => handleDelete(list.id)}> Deletar </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DailyList