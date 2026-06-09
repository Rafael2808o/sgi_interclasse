import { useNavigate } from "react-router-dom";
import { ContainerPrincipal } from "../styles/Estilos";

export default function Principal() {
  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("rememberMe");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");

    navigate("/");
  };

  const pararDeLembrar = () => {
    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");

    if (token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("usuario", usuario || "");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("rememberMe");

    alert("Lembrar de mim desativado. Ao fechar o navegador você será desconectado.");
  };

  return (
    <ContainerPrincipal
      style={{
        position: "relative",
        minHeight: "100vh",
        flexDirection: "column",
        gap: "20px"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "10px"
        }}
      >

        <button
          onClick={sair}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Sair
        </button>
      </div>

      <h1>Página Principal</h1>
    </ContainerPrincipal>
  );
}