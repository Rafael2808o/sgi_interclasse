export const getAuth = () => {
const tokenLocal = localStorage.getItem("token");
const tokenSession = sessionStorage.getItem("token");

const usuarioLocal = localStorage.getItem("usuario");
const usuarioSession = sessionStorage.getItem("usuario");

const token = tokenLocal || tokenSession;
const usuario = usuarioLocal || usuarioSession;

  return {
    token,
    usuario: usuario ? JSON.parse(usuario) : null
  };
};