import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Tipos para os formulários
interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

interface LoginFormData {
  identifier: string; // Email ou telefone
  password: string;
}

export default function App() {
  const [screen, setScreen] = useState<"home" | "register" | "login">("home");
  return (
    <div style={styles.appContainer}>
      {screen === "home" && <HomeScreen onNavigate={setScreen} />}
      {screen === "register" && <RegisterScreen onNavigate={setScreen} />}
      {screen === "login" && <LoginScreen onNavigate={setScreen} />}
    </div>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (s: any) => void }) {
  return (
    <div style={styles.screen}>
      <h2 style={styles.title}>Aprenda ou Compartilhe seus pratos favoritos.</h2>
      <p style={styles.subtitle}>Rápido, fácil e sem filas!</p>

      <button style={styles.button} onClick={() => onNavigate("login")}>
        Login
      </button>

      <button style={styles.buttonSecondary} onClick={() => onNavigate("register")}>
        Cadastrar-se
      </button>

      <div style={{ marginTop: 16 }}>Login com Google</div>

      <div style={{ marginTop: 24, fontSize: 12, opacity: 0.7 }}>
        [Ilustração de usuário com comida]
      </div>
    </div>
  );
}

/* ----------------------------------------------
   TELA DE CADASTRO COM VALIDAÇÃO REAL
------------------------------------------------- */

// Schema Yup para validação
const registerSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().min(6, "Senha deve ter no mínimo 6 caracteres").required("Senha é obrigatória"),
  acceptTerms: yup.boolean().oneOf([true], "Você deve aceitar os termos")
});

function RegisterScreen({ onNavigate }: { onNavigate: (s: any) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange"
  });

  const onSubmit = (data: RegisterFormData) => {
    alert("Conta criada com sucesso: " + JSON.stringify(data, null, 2));
  };

  return (
    <div style={styles.screen}>
      <button style={styles.backBtn} onClick={() => onNavigate("home")}>
        Voltar
      </button>

      <h2>Cadastre-se</h2>
      <p style={styles.subtitle}>crie sua conta para iniciar o app</p>

      <input placeholder="Nome" style={styles.input} {...register("name")} />
      {errors.name && <span style={styles.error}>{errors.name.message}</span>}

      <input placeholder="Email" style={styles.input} {...register("email")} />
      {errors.email && <span style={styles.error}>{errors.email.message}</span>}

      <input type="password" placeholder="Senha" style={styles.input} {...register("password")} />
      {errors.password && <span style={styles.error}>{errors.password.message}</span>}

      <label style={styles.checkboxLabel}>
        <input type="checkbox" {...register("acceptTerms")} /> Aceito os Termos e a Política de Privacidade
      </label>
      {errors.acceptTerms && <span style={styles.error}>{errors.acceptTerms.message}</span>}

      <button style={styles.buttonSecondary} onClick={handleSubmit(onSubmit)}>
        Cadastrar-se
      </button>
    </div>
  );
}

/* ----------------------------------------------
   TELA DE LOGIN COM VALIDAÇÃO REAL
------------------------------------------------- */

const loginSchema = yup.object({
  identifier: yup.string().required("Informe email ou telefone"),
  password: yup.string().required("Senha obrigatória")
});

function LoginScreen({ onNavigate }: { onNavigate: (s: any) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange"
  });

  const onSubmit = (data: LoginFormData) => {
    alert("Login efetuado com: " + JSON.stringify(data, null, 2));
  };

  return (
    <div style={styles.screen}>
      <button style={styles.backBtn} onClick={() => onNavigate("home")}>
        Voltar
      </button>

      <h2>Login</h2>
      <p style={styles.subtitle}>entre na sua conta</p>

      <input placeholder="Email ou Telefone" style={styles.input} {...register("identifier")} />
      {errors.identifier && <span style={styles.error}>{errors.identifier.message}</span>}

      <input type="password" placeholder="Senha" style={styles.input} {...register("password")} />
      {errors.password && <span style={styles.error}>{errors.password.message}</span>}

      <p style={styles.link}>Esqueci minha senha</p>

      <button style={styles.button} onClick={handleSubmit(onSubmit)}>
        Login
      </button>
    </div>
  );
}

/* ----------------------------------------------
   ESTILOS SIMPLES
------------------------------------------------- */

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    fontFamily: "Arial, sans-serif"
  },
  screen: {
    width: 350,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #D9D9D9",
    borderRadius: 12,
    padding: 24
  },
  title: { textAlign: "center", marginBottom: 8 },
  subtitle: { textAlign: "center", marginBottom: 16 },
  input: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#FF6347",
    color: "#fff",
    borderRadius: 6,
    border: "none",
    marginTop: 12,
    cursor: "pointer"
  },
  buttonSecondary: {
    width: "100%",
    padding: 12,
    backgroundColor: "#FF7F66",
    color: "#fff",
    borderRadius: 6,
    border: "none",
    marginTop: 12,
    cursor: "pointer"
  },
  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 12,
    background: "none",
    border: "none",
    color: "#FF6347",
    cursor: "pointer"
  },
  checkboxLabel: { fontSize: 12, marginTop: 8 },
  link: { fontSize: 12, marginTop: 4, marginBottom: 12, color: "#0A58CA", cursor: "pointer" },
  error: { color: "red", fontSize: 12, alignSelf: "flex-start", marginTop: 2 }
};

