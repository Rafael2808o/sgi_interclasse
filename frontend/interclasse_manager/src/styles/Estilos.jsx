import "@fontsource/jacquard-24";
// npm install @fontsource/jacquard-24
import styled from "styled-components";
// npm install styled-components
import fundo from "../assets/fundo.png";

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100dvh;
  background: #000;
  display: flex;
  flex-direction: column;
  color: #fff;
  position: relative;
  overflow-x: hidden;

  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
`;

export const LoginWrapper = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  min-height: calc(100dvh - 50px);

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: auto;
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  padding: 48px 40px;

  background: #000 url(${fundo}) center/cover no-repeat;
  background-position: 10% 30%;

  box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.35);

@media (max-width: 900px) {
  background: none;
  background-color: #000;
  box-shadow: none;

  min-height: 180px;
  padding: 15px 10px;
  justify-content: center;
}

@media (max-width: 576px) {
  min-height: 170px;
  padding: 15px 10px;
  justify-content: center;
}
   
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  width: 100%;
`;
export const Logo = styled.img`
  width: clamp(500px, 55vw, 900px);
  height: auto;

  margin-top: -60px;

  filter:
    drop-shadow(0 15px 40px rgba(0,0,0,.5))
    brightness(1.1);

  @media (max-width: 900px) {
    width: 280px;
    margin-top: 0;
  }

  @media (max-width: 576px) {
    width: 260px;
    margin-top: 0;
  }
`;

export const Subtitle = styled.h2`
  font-size: 30px;
  font-weight: 800;
  margin: 0;

  color: white;

  span {
    color: #c5a059;
  }
`;

export const Description = styled.p`
  font-size: 15px;
  color: #c5c5c5;
  line-height: 1.8;
  margin: 0;
  max-width: 420px;
`;

export const Footer = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.45);
  line-height: 1.6;
  text-align: center;
  margin: 0;

  /* Desktop */
  @media (min-width: 901px) {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }

  /* Mobile */
  @media (max-width: 900px) {
    position: fixed;
    bottom: 90px;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 10;
  }
`;

export const RightPanel = styled.div`
  flex: 0.55;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;

  background: #000;

  @media (max-width: 900px) {
    padding: 10px;
    align-items: flex-start;
    margin-top: -15px;
  }
`;

export const PanelCard = styled.div`
  width: 100%;
  max-width: 520px;

  padding: 28px;

  background: rgba(18,18,18,0.92);

  border: 1px solid rgba(197,160,89,.2);

  border-radius: 28px;

  box-shadow: 0 30px 80px rgba(0,0,0,.55);

  backdrop-filter: blur(18px);

@media (max-width: 576px) {
  padding: 20px;
  border-radius: 20px;
  width: calc(100vw - 24px);
  max-width: none;
}
`;

export const FormHeader = styled.div`
  margin-bottom: 34px;
  text-align: center;

  h1 {
    font-family: "Jacquard 24", serif;
    font-weight: normal;
    margin: 0;
    font-size: clamp(32px, 5vw, 50px);
    line-height: 1;
  }

  p {
    margin-top: 10px;
    color: #b9b9b9;
    font-size: 14px;
  }
@media (max-width: 576px) {
  h1 {
    font-size: 36px;  
    font-weight: normal;
    letter-spacing: 0.5px;
    color: #fff;
  }
}
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #9a9a9a;
  font-weight: 600;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 56px;

  padding: 16px 16px 16px 48px;

  background: rgba(255,255,255,.06);

  border: 1px solid rgba(255,255,255,.12);

  border-radius: 16px;

  color: #f4f4f4;

  font-size: 14px;

  outline: none;

  transition: all .25s ease;

  box-sizing: border-box;

  &::placeholder {
    color: #888;
  }

  &:focus {
    border-color: rgba(197,160,89,.45);
    background: rgba(255,255,255,.1);
  }
`;

export const FormActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 12px;

  margin: 16px 0 28px;

  @media (max-width: 576px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;

  accent-color: #c5a059;

  @media (max-width: 576px) {
    appearance: none;
    width: 42px;
    height: 22px;
    border-radius: 30px;
    background: #444;
    position: relative;
    transition: .3s;

    &::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      left: 3px;
      top: 3px;
      border-radius: 50%;
      background: white;
      transition: .3s;
    }

    &:checked {
      background: #c5a059;
    }

    &:checked::before {
      transform: translateX(20px);
    }
  }
`;

export const ForgotPassword = styled.button`
  background: none;
  border: none;
  color: #c5a059;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.85;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 4px;
  background: linear-gradient(180deg, #111111 0%, #1b1b1b 100%);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  box-shadow: 0 15px 35px rgba(0,0,0,0.25);

  &:hover {
    transform: translateY(-1px);
    background: linear-gradient(180deg, #1a1a1a 0%, #111111 100%);
  }
`;

export const Separator = styled.span`
  display: block;
  text-align: center;
  color: #888;
  font-size: 13px;
  margin: 30px 0 24px 0;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 42%;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 14px;

  margin-bottom: 24px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const SocialButton = styled.button`
  width: 100%;

  padding: 14px;

  background: rgba(0,0,0,.35);

  border: 1px solid rgba(255,255,255,.12);

  border-radius: 16px;

  color: white;

  font-size: 14px;

  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  cursor: pointer;

  transition: .25s;

  &:hover {
    background: rgba(255,255,255,.08);
    border-color: rgba(197,160,89,.25);
  }
`;

export const CreateAccountRow = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #b1b1b1;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const CreateAccountLink = styled.button`
  background: none;
  border: none;
  color: #c5a059;
  font-weight: 700;
  cursor: pointer;
  font-size: 13px;
  padding: 0;

  &:hover {
    opacity: 0.85;
  }
`;

export const FooterLinks = styled.footer`
  width: 100%;
  min-height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 12px;

  border-top: 1px solid rgba(255,255,255,.08);

  background: rgba(0,0,0,.45);

  div {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
  }

  a {
    color: #bbb;
    text-decoration: none;
    font-size: 13px;

    &:hover {
      color: white;
    }
  }

  @media (max-width: 576px) {
    div {
      gap: 15px;
    }

    a {
      font-size: 12px;
    }
  }
`;

export const ContainerPrincipal = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;