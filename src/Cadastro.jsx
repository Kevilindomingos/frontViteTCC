import styles from './Cadastro.module.css';
import { api } from './api/api';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import logoTipo from './assets/logoVermelho.png';

function Cadastro() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [type, setType] = useState('responsavel');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);

  const carregaUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      setMessage('Erro ao carregar usuários');
    }
  }
  useEffect(() => {
    carregaUsers();
  }, []);

  const handleRegistro = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem');
      return;
    }
    try {
      await api.post('/users', { name, email, password, type });
      setMessage('Usuário cadastrado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      carregaUsers();
    } catch (error) {
      setMessage('Erro no cadastro: ' + (error.response?.data?.message || 'Verifique os dados'));
    }
  };

  return (
    <div className={styles.wrapImg}>
      <div className={styles.blocoLogin}>
        <div className={styles.wrapForm}>
          <img src={logoTipo} alt="imagem de logo" className={styles.fotoLogo}/>
          <h1 className={styles.tituloLogo}>GRAND CLUB <br />BLUE ROMA</h1>
        </div>
        
        <div className={styles.wrapForm1}>
          <form onSubmit={handleRegistro}>
            <div className={styles.formTitle}>Cadastro de Usuário</div>
            <div style={{ position: "relative", width: "100%", marginBottom: "20px" }}>
              <input type="text" placeholder='Nome completo' value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            
            <div style={{ position: "relative", width: "100%", marginBottom: "20px" }}>
              <input type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            
            <div style={{ position: "relative", width: "100%", marginBottom: "20px" }}>
              <input type={showPassword ? 'text' : 'password'} placeholder={editUserId ? 'Nova senha (opcional)' : 'Senha'} value={password} 
                onChange={(e) => setPassword(e.target.value)} required={!editUserId}/>
              <span className={styles.passwordToggle}onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
              <div style={{ position: "relative", width: "100%", marginBottom: "20px" }}>
                <input type={showPassword ? 'text' : 'password'} placeholder='Confirme sua senha' value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} required/>
              </div>
            
            <div className={styles.selectWrapper}>
              <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="responsavel">Responsável</option>
              </select>
            </div>
            
            <div className={styles.selecaoBotoes}>
                  <button type="button" onClick={() => navigate('/')}>Voltar para Login</button>
                  <button type="submit">Cadastrar</button>
            </div>
            
            {message && (
              <div className={`${styles.message} ${
                message.includes('sucesso') ? styles.success : styles.error
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;