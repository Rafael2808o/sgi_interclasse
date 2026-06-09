import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logover from "../assets/logover.png";
import logoverMob from "../assets/logoverMob.png";
// npm install react-icons

import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import {
PageWrapper,
LoginWrapper,
LeftPanel,
LeftContent,
RightPanel,
PanelCard,
Logo,
Footer,
FormHeader,
FormGroup,
Label,
Input,
InputWrapper,
FormActionsRow,
Checkbox,
ForgotPassword,
PrimaryButton,
Separator,
SocialButtons,
SocialButton,
CreateAccountRow,
CreateAccountLink,
FooterLinks
} from "../styles/Estilos";

export default function Login() {
const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(true);
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [mensagem, setMensagem] = useState("");
const [lembrar, setLembrar] = useState(false);
const [carregando, setCarregando] = useState(false);
const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);

const API_URL = "https://interclassemanager-seven.vercel.app";

const Login = async (event) => {
    event.preventDefault();
    setMensagem("");

    if (email.trim() === "" || senha.trim() === "") {  
        setMensagem("Preencha todos os campos");
        return;
    }

    setCarregando(true);

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const data = await res.json().catch(() => ({ message: "Resposta inválida da API" }));

        if (!res.ok) {
            setMensagem(data.message || "Erro ao realizar login");
            return;
        }

        const { token, usuario } = data;

        if (lembrar) {
            localStorage.setItem("token", token);
            localStorage.setItem("usuario", JSON.stringify(usuario));
            localStorage.setItem("rememberMe", "true");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("usuario");
        } else {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("usuario", JSON.stringify(usuario));
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
        }

        try {
            const usuariosRes = await fetch(`${API_URL}/usuarios`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (usuariosRes.ok) {
                const usuarios = await usuariosRes.json();
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
            }
        } catch (err) {
            console.warn("Não foi possível buscar usuários:", err.message);
        }

        navigate("/principal");
    } catch (error) {
        setMensagem(`Erro ao realizar login: ${error.message}`);
    } finally {
        setCarregando(false);
    }
};

useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (rememberMe) {
        setLembrar(true);
        const usuarioSalvo = localStorage.getItem("usuario");
        if (usuarioSalvo) {
            try {
                const usuario = JSON.parse(usuarioSalvo);
                if (usuario.email) {
                    setEmail(usuario.email);
                }
            } catch (err) {
                console.warn("Falha ao ler usuário salvo:", err.message);
            }
        }
    }

    if (token) {
        navigate("/principal");
    }
}, [navigate]);

return (
    <PageWrapper>
        <LoginWrapper>
<LeftPanel>
    <LeftContent>
        <Logo
            src={isMobile ? logoverMob : logover}
            alt="Interclasse Manager"
        />
    </LeftContent>

    {isMobile && (
        <Footer>
            © 2026 Interclasse Manager. Todos os direitos reservados.
        </Footer>
    )}
</LeftPanel>

            <RightPanel>
<div
    style={{
        width: "100%",
        maxWidth: "520px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
    }}
>
        <PanelCard>
            <form onSubmit={Login}>
                <FormHeader>
                    <h1>Bem-vindo de volta!</h1>
                    <p>Faça login para continuar</p>
                </FormHeader>

                <FormGroup>
                    <Label>E-mail</Label>
                    <InputWrapper>
                        <FiMail
                            size={18}
                            style={{
                                position: "absolute",
                                left: "16px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#888"
                            }}
                        />
                        <Input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ paddingLeft: "46px" }}
                        />
                    </InputWrapper>
                </FormGroup>

                <FormGroup>
                    <Label>Senha</Label>
                    <InputWrapper>
                        <FiLock
                            size={18}
                            style={{
                                position: "absolute",
                                left: "16px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#888"
                            }}
                        />

                        <Input
                            type={showPassword ? "password" : "text"}
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            style={{ paddingLeft: "46px" }}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "16px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "transparent",
                                border: "none",
                                color: "#888",
                                cursor: "pointer"
                            }}
                        >
                            {showPassword ? (
                                <FiEyeOff size={18} />
                            ) : (
                                <FiEye size={18} />
                            )}
                        </button>
                    </InputWrapper>
                </FormGroup>

                <FormActionsRow>
                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer"
                        }}
                    >
                        <Checkbox
                            type="checkbox"
                            checked={lembrar}
                            onChange={(e) => setLembrar(e.target.checked)}
                        />

                        <span
                            style={{
                                color: "#bbb",
                                fontSize: "14px"
                            }}
                        >
                            Lembrar de mim
                        </span>
                    </label>

                    <ForgotPassword type="button">
                        Esqueci minha senha
                    </ForgotPassword>
                </FormActionsRow>

                <PrimaryButton type="submit" disabled={carregando}>
                    {carregando ? "Entrando..." : "ENTRAR"}
                </PrimaryButton>

                <p
                    style={{
                        color: "#ff6b6b",
                        textAlign: "center",
                        marginTop: "12px"
                    }}
                >
                    {mensagem}
                </p>

                <CreateAccountRow>
                    <span>Ainda não tem uma conta?</span>

                    <CreateAccountLink type="button">
                        Criar conta
                    </CreateAccountLink>
                </CreateAccountRow>
            </form>
        </PanelCard>

{!isMobile && (
    <Footer
        style={{
            position: "absolute",
            top: "calc(100% + 40px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            textAlign: "center"
        }}
    >
        © 2026 Interclasse Manager. Todos os direitos reservados.
    </Footer>
)}
    </div>
</RightPanel>
        </LoginWrapper>

        <FooterLinks>
            <div>
                <a href="#">Termos de Uso</a>
                <a href="#">Política de Privacidade</a>
                <a href="#">Suporte</a>
            </div>
        </FooterLinks>
    </PageWrapper>
);

}