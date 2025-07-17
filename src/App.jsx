/* página inicial de login */

import style from './App.module.css'
import { api } from './api/api'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';
import logoTipo from './assets/logo.png'


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
  <>
  <div className={style.wrapImg}>
    <div className={style.wrapLogin}></div>
    <div className={style.blocoLogin}>
      <div className={style.wrapForm}>
       <img src={logoTipo} alt="imagem de logo" style={{ marginBottom: "4vh", width: "170px", height: "auto", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} className={style.fotoLogo}/>
        <h1 className={style.tituloLogo}>GRAND CLUB <br/>BLUE ROMA</h1>      
      </div>
      <div className={style.wrapForm1}>
        <form onSubmit={handleLogin}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <input type="email" placeholder='Digite seu E-mail' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <input type={showPassword ? 'text' : 'password'} placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className={style.selectWrapper}>
            <label htmlFor="type">Categoria</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="">Selecione a categoria</option>
              <option value="responsavel">Responsável</option>
              <option value="funcionario">Funcionário</option>
            </select>
          </div>
          <button type='submit'>Entrar</button>
          <p>{message}</p>
        </form>
      </div>
    </div>
    </div>
    </>
  )
}

export default App  