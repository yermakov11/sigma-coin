import coin_img from "../../assets/sigma-coin-img.png";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router";
import { useActionState, useState } from "react";
import { loginAPI } from "../../api/api";
import FormStatus from "../../components/formStatus/FormStatus";
import { useAuth } from "../../contexts/userContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [state, submitAction] = useActionState(auth, {
    data: null,
    error: null,
  });

  const [errorRegex, setErrorRegex] = useState({
    email: "",
    password: "",
  });

  const error_style = {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  };

  const [status, setStatus] = useState<string>("sing in");

  async function auth(prevState: any, formData: FormData) {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!email || !password) {
      return { ...prevState, error: "All fields are required" };
    }

    let errors = { email: "", password: "" };

    if (!emailRegex.test(email)) {
      errors.email = "Invalid email";
    }
    if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 6 characters long and contain at least one letter and one number";
    }

    if (errors.email || errors.password) {
      setErrorRegex(errors);
      return prevState;
    }

    try {
      const response = await loginAPI(email, password);
      if (response) {
        login(response);
        setStatus("Login successful");
        console.log("Login successful", response);
        navigate("/main-page");
      }
      return { data: response, error: null };
    } catch (error) {
      console.error("Login error:", error);
      return { ...prevState, error: "An unexpected error occurred" };
    }
  }

  return (
    <main className={styles.container_register}>
      <div className={styles.header}>
        <img src={coin_img} alt="error" />
        <h1>Sigma coin</h1>
      </div>
      <div className={styles.container_form}>
        <h1>Login</h1>
        <form action={submitAction} className={styles.register_form}>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="email"
          />
          {errorRegex.email && (
            <p style={error_style} className="error">
              {errorRegex.email}
            </p>
          )}
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="password"
          />
          {errorRegex.password && (
            <p style={error_style} className="error">
              {errorRegex.password}
            </p>
          )}
          <FormStatus status={status} />
          {state.error && <p style={error_style}>{state.error}</p>}
          <Link to="/register">registration</Link>
        </form>
      </div>
    </main>
  );
}
