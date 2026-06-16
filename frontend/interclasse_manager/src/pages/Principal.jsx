import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaTrophy, FaFutbol, FaChartBar, FaTv } from "react-icons/fa";
import logo from "../assets/logover.png";

export default function Principal() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: ""
  });
  const location = useLocation();

  useEffect(() => {


    const usuarioLogadoRaw = localStorage.getItem("Usuario Logado");
    const usuarioLogado = usuarioLogadoRaw ? JSON.parse(usuarioLogadoRaw) : null;

    const hasPersistent = usuarioLogado && usuarioLogado.lembrar === true;
const tokenSession = sessionStorage.getItem("token");

if (!tokenSession && !hasPersistent) {
      try {
        navigate("/", { replace: true });
      } catch (e) {
      }
      setTimeout(() => window.location.replace("/"), 50);
      return;
    }

    try {
      const usuarioSession = sessionStorage.getItem("usuario");

const usuarioSalvo = hasPersistent
  ? usuarioLogado.usuario
  : usuarioSession
  ? JSON.parse(usuarioSession)
  : null;
      if (usuarioSalvo) {
        setUsuario({
          nome: usuarioSalvo.nome || "Sem nome",
          email: usuarioSalvo.email || "Sem email"
        });
      }
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
    }
  }, [navigate, location]);

  const sair = () => {
    localStorage.removeItem("Usuario Logado");
    localStorage.removeItem("DadosLogin");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    navigate("/", { replace: true });
    setTimeout(() => window.location.replace("/"), 50);
  };

  return (
    <div style={styles.container}>
      <button onClick={sair} style={styles.logoutButton}>
        <FaSignOutAlt />
        Sair
      </button>

      <img src={logo} alt="Interclasse Manager" style={styles.logo} />

      <h1 style={styles.title}>Interclasse Manager</h1>
      <p style={styles.subtitle}>Bem-vindo ao sistema</p>

      <div style={styles.userContainer}>
        <FaUserCircle size={85} color="#c5a059" />

        <p style={styles.userName}>{usuario.nome}</p>
        <p style={styles.userEmail}>{usuario.email}</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <FaTrophy size={50} color="#c5a059" />
          <span>Campeonatos</span>
        </div>

        <div style={styles.card}>
          <FaFutbol size={50} color="#c5a059" />
          <span>Jogos</span>
        </div>

        <div style={styles.card}>
          <FaChartBar size={50} color="#c5a059" />
          <span>Resultados</span>
        </div>

        <div style={styles.card}>
          <FaTv size={50} color="#c5a059" />
          <span>Placar Ao Vivo</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "#050505",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 16px",
    position: "relative",
    fontFamily: "Arial",
    boxSizing: "border-box"
  },

  logoutButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "#d81f1f",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "12px 18px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px"
  },

  logo: {
    width: "380px"
  },

  title: {
    color: "#fff",
    fontSize: "36px",
    fontWeight: "700",
    margin: "5px 0"
  },

  subtitle: {
    color: "#9a9a9a",
    fontSize: "24px",
    marginBottom: "10px"
  },

  userContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px"
  },

  userName: {
    color: "#b0b0b0",
    fontSize: "28px",
    fontWeight: "700"
  },

  userEmail: {
    color: "#c5a059",
    fontSize: "24px"
  },

  grid: {
    width: "100%",
    maxWidth: "600px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "14px",
    marginBottom: "10px"
  },

  card: {
    background: "#171717",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "18px",
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.05rem",
    cursor: "pointer"
  }
};