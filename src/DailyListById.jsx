import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { api } from './api/api'

function DailyListById() {
  const { id } = useParams()
  const [routines, setRoutines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchDailyList() {
      try {
        const response = await api.get(`/list/${id}/dailyList`)
        setRoutines(response.data)
      } catch (err) {
        setError('Erro ao carregar a rotina.')
      } finally {
        setLoading(false)
      }
    }
    fetchDailyList()
  }, [id])

  if (loading) return <p>Carregando rotina...</p>
  if (error) return <p>{error}</p>

  return (
    <div style={{ padding: '20px' }}>
      <h2>Rotina diária do ID: {id}</h2>
      {routines.length === 0 ? (
        <p>Nenhuma rotina cadastrada.</p>
      ) : (
        <ul>
          {routines.map((item, index) => (
            <li key={index}>
              <strong>hora da refeição:</strong> {item.horaRefeicao} <br />
              <strong>medicamentos: (se tiver)</strong> {item.medicamentos} <br />
              <strong>atividades realizadas:</strong> {item.atvRealizadas} <br />
              <strong>humor geral:</strong> {item.humorGeral} <br />
              <strong>higiene pessoal:</strong> {item.higienePessoal} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DailyListById
