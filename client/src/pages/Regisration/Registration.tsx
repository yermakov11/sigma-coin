import Header from "../../components/Header/Header"
import styles from './Registration.module.scss'
import { Link } from "react-router-dom"
import { useActionState, useState } from "react";
import {registerAPI} from "../../api/api";
import FormStatus from "../../formStatus/FormStatus";

export default function Registration() {
  
  const [state, submitAction] = useActionState(auth, {
    data: null,
    error: null,
  });

  const [errorRegex, setErrorRegex] = useState({
    name: "",
    surname: "",
    password: "",
    email: "",
  });

  const error_style={
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  }
  
  const [status, setStatus] = useState<string>("sing up");


 async function auth (prevState:any, formData:FormData){
      const name = formData.get('name') as string | null;
      const surname = formData.get('surname') as string | null;
      const password = formData.get('password') as string | null;
      const email = formData.get('email') as string | null;
      
      if (!name || !surname || !password || !email) {
        return { ...prevState, error: "All fields are required" };
      }
      const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,}$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let errors = { name: "", surname: "", password: "", email: "" };

      if (!nameRegex.test(name)) {
          errors.name = "Name must be at least 2 characters long";
      }
      if (!nameRegex.test(surname)) {
          errors.surname = "Surname must be at least 2 characters long";
      }
      if (!passwordRegex.test(password)) {
          errors.password = "Password must be at least 6 characters long and contain at least one letter and one number";
      }
      if (!emailRegex.test(email)) {
          errors.email = "Invalid email";
      }

      if (errors.name || errors.surname || errors.password || errors.email) {
        setErrorRegex(errors);
        return prevState;
      }

      try {
        const response = await registerAPI(name, surname, password, email);
        return {data: response, error: null}
      } catch (error:unknown) {
        if (error instanceof Error) {
          return { ...prevState, error: error.message };
        }
      }   
  }

  return (
    <main className={styles.container_register}>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.container_form}>
            <h1>Registration</h1>
            <form action={submitAction} className={styles.register_form}>
              <input type="text" name="name" placeholder="name" autoComplete="name"/>
              {errorRegex.name && <p style={error_style} className="error">{errorRegex.name}</p>}
              <input type="text" name="surname"  placeholder="surname" autoComplete="surname"/>
              {errorRegex.surname && <p style={error_style} className="error">{errorRegex.surname}</p>}
              <input type="password" name="password" placeholder="password" autoComplete="current-password"/>
              {errorRegex.password && <p style={error_style} className="error"> {errorRegex.password}</p>}
              <input type="email" name="email" placeholder="email" autoComplete="email"/>
              {errorRegex.email && <p style={error_style} className="error">{errorRegex.email}</p>}
              <FormStatus status={status} />   
              {state.data && <p className={styles.verify_email}>Please, verify your email</p>}           
              {state.error && <p style={error_style}>{state.error}</p>}
              <Link to="/login">Login</Link>                
            </form>
        </div>
    </main>
  )
}
