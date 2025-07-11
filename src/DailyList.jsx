import './dailyList.module.css'

import { useEffect, useState } from 'react'
import { api } from './api/api'
import { Menu } from './components/menu'
import { useNavigate } from 'react-router'

function DailyList() {
  const navigate = useNavigate()
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editListId, setEditListId] = useState(null)
  const [editData, setEditData] = useState({horaRefeicao: '', medicamentos: '', atvRealizadas: '', humorGeral: '',  higienePessoal: ''})

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(!storedUser) navigate('/')
  }, [navigate])

    const fetchLists = async () => {
      try {
        const response = await api.get('/DailyList')
        setLists(response.data)
      } catch (err) {
        setError('Error ao carregar listas', err)
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchLists()
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/lists/${id}`)
      setLists(lists.filter((u) => u.id !== id))
    } catch (err) {
      setError('Erro ao deletar o usuário', err)
    }
  }

  const handleEditClick = (list) => {
    setEditListId(list.id)
    setEditData({horaRefeicao: list.horaRefeicao, medicamentos: list.medicamentos, atvRealizadas: list.atvRealizadas, humorGeral: list.humorGeral, higienePessoal: list.higienePessoal})
  }

  const handleEditChange = (e) => {
    const {name, value} = e.target
    setEditData({...editData, [name]: value})
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const updatedData = {
        horaRefeicao: editData.horaRefeicao,
        medicamentos: (editData.medicamentos),
        atvRealizadas: (editData.atvRealizadas, 10)
      }
  
      await api.put(`/lists/${editListId}`, updatedData)
      setEditListId(null)
      fetchLists()
    } catch (err) {
      setError('Erro ao atualizar o produto', err)
    }
  }
  
  if (loading) return <p>Carregando produtos...</p>
  if (error) return <p>{error}</p>

  return (
    <>
    <section>
      <Menu/>
    <div style={{padding: '2rem'}}>
          <h1>Lista de Produtos</h1>
          <ul>
            {lists.map((list) => (
              <li key={list.id} style={{marginTop: '2rem', marginLeft: '1rem'}}>
                {editListId === list.id ? (
                  <form onSubmit={handleUpdate} style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <input type="text" name='horaRefeicao' value={editData.horaRefeicao} onChange={handleEditChange} required/>
                    <input type="text" name='medicamentos' value={editData.medicamentos} onChange={handleEditChange} required/>
                    <input type="text" name='atvRealizadas' value={editData.atvRealizadas} onChange={handleEditChange} required/>
                    <input type="text" name='humorGeral' value={editData.humorGeral} onChange={handleEditChange} required/>
                    <input type="text" name='higienePessoal' value={editData.higienePessoal} onChange={handleEditChange} required/>
                    <button type='submit'>Salvar</button>
                    <button type='button' onClick={() => setEditListId(null)}>CANCELAR</button>
                  </form>
                ) : (
                  <>
                <strong>LISTA DE ROTINA REALIZADA NO DIA</strong> <br/> 
                <i>{list.horaRefeicao}</i><br/> 
                <i>{list.medicamentos}</i><br /> 
                <i>{list.atvRealizadas}</i><br/> 
                <i>{list.humorGeral}</i><br/>
                <i>{list.higienePessoal}</i><br/> 
                  <div style={{display: 'inline-flex', gap: '0.5rem', marginLeft: '1rem'}}>
                    <button onClick={() => handleEditClick(list)}>EDITAR</button>
                    <button onClick={() => handleDelete(list.id)}>DELETAR</button>
                  </div>
                  </>
                )}
                </li>
            ))}
          </ul>
    </div>
    </section>
    </>
  )
}

export default DailyList