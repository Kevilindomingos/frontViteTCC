/* página inicial de login */

import style from './App.module.css'
import { api } from './api/api'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, User, Check, UserRound } from 'lucide-react';
import { select } from './components/select'

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      navigate('/AboutUs')
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/login', { email, password, type})
      const user = response.data

      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigate('/AboutUs')
    } catch (error) {
      setMessage('Erro no login: ' + (error.response?.data?.message || 'Verifique os dados'))
    }
  }

  return (
    <div className={style.wrapLogin}>

    <div className={style.wrapImg}>
      <div className={style.degrade}></div>
    </div>
    <div className={style.wrapForm}>
      <form onSubmit={handleLogin}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h2>Login</h2>
        </div>
        <div style={{position: "relative", width: "100%"}}>
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{position: "relative", width: "100%"}}>
          <input type={showPassword ? 'text' : 'password'} placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className={style.select}>
          <div className={style.categorySelect}>
            <label htmlFor="options-view-button">Categoria</label>
            <input type="checkbox" className={style.optionsViewButton}/>

            <div className={style.selectButton}>
              <div className={style.selectedValue}>Selecione a categoria</div>

              <div className={style.chevrons}>
                <ChevronDown className={style.ChevronDown}/>
                <ChevronUp className={style.ChevronUp}/>
              </div>
            </div>
          </div>

          <ul className={style.options}>
            <li className={style.option}>
              <input type="radio" placeholder='Responsável' value={type} onChange={(e) => setType(e.target.value)} required />
              <User className={style.responsavel}/>
              <span className={style.label}>Responsável</span>
              <Check className={style.checkIcon}/>
            </li>
          </ul>

          <ul className={style.options}>
            <li className={style.option}>
              <input type="radio" placeholder='Funcionário' value={type} onChange={(e) => setType(e.target.value)} required />
              <UserRound className={style.responsavel}/>
              <span className={style.label}>Funcionário</span>
              <Check className={style.checkIcon}/>
            </li>
          </ul>
        </div>

        <button type='submit'>Entrar</button>
        <p>{message}</p>
      </form>
    </div>

  </div>
  )
}

export default App

{/* <div style={{position: "relative", width: "100%"}}>
          <input type="type" placeholder='Type' value={type} onChange={(e) => setType(e.target.value)} required />
        </div> */}