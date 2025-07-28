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
  const [searchTerm, setSearchTerm] = useState('');

  // Carrega usuários ao iniciar
  const loadUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      setMessage('Erro ao carregar usuários');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Cadastra novo usuário
  const handleRegister = async (e) => {
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
      loadUsers();
    } catch (error) {
      setMessage('Erro no cadastro: ' + (error.response?.data?.message || 'Verifique os dados'));
    }
  };

  // Preenche formulário para edição
  const handleEdit = (user) => {
    setEditUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setType(user.type);
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  };

  // Atualiza usuário
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${editUserId}`, { 
        name, 
        email, 
        ...(password && { password }),
        type 
      });
      setMessage('Usuário atualizado com sucesso!');
      setEditUserId(null);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      loadUsers();
    } catch (error) {
      setMessage('Erro ao atualizar: ' + (error.response?.data?.message || 'Verifique os dados'));
    }
  };

  // Remove usuário
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/users/${id}`);
        setMessage('Usuário removido com sucesso!');
        loadUsers();
      } catch (error) {
        setMessage('Erro ao remover usuário');
      }
    }
  };

  // Cancela edição
  const cancelEdit = () => {
    setEditUserId(null);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  };

  return (
    <div className={styles.wrapImg}>
      <div className={styles.blocoLogin}>
        {/* Cabeçalho */}
        <div className={styles.wrapForm}>
          <img 
            src={logoTipo} 
            alt="imagem de logo" 
            className={styles.fotoLogo}
          />
          <h1 className={styles.tituloLogo}>GRAND CLUB <br />BLUE ROMA</h1>
        </div>

        {/* Formulário de Cadastro/Edição */}
        <div className={styles.wrapForm1}>
          <form onSubmit={editUserId ? handleUpdate : handleRegister}>
            <div className={styles.formTitle}>
              {editUserId ? 'Editar Usuário' : 'Cadastro de Usuário'}
            </div>
            
            <div style={{ position: "relative", width: "100%", marginBottom: "20px" }}>
              <input 
                type="text" 
                placeholder='Nome completo' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
              />
            </div>
            
            <div style={{ position: "relative", width: "100%", marginBottom: "20px" }}>
              <input 
                type="email" 
                placeholder='E-mail' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            
            <div style={{ position: "relative", width: "100%", marginBottom: "20px" }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder={editUserId ? 'Nova senha (opcional)' : 'Senha'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required={!editUserId}
              />
              <span 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
            
            {!editUserId && (
              <div style={{ position: "relative", width: "100%", marginBottom: "20px" }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder='Confirme sua senha' 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required
                />
              </div>
            )}
            
            <div className={styles.selectWrapper}>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)} 
                required
              >
                <option value="responsavel">Responsável</option>
                <option value="funcionario">Funcionário</option>
              </select>
            </div>
            
            <div className={styles.selecaoBotoes}>
              {editUserId ? (
                <>
                  <button type="button" onClick={cancelEdit}>
                    Cancelar
                  </button>
                  <button type="submit">Atualizar</button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => navigate('/')}>
                    Voltar para Login
                  </button>
                  <button type="submit">Cadastrar</button>
                </>
              )}
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