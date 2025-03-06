import Header from "../../components/Header/Header"
import styles from './Login.module.scss'
import { Link } from "react-router"

export default function Login() {
  return (
    <main className={styles.container_register}>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.container_form}>
            <h1>Login</h1>
            <form className={styles.register_form}>
              <input type="email" placeholder="email"/>
              <input type="password" placeholder="password"/>
              <button type="submit">sing in</button>
              <Link to="/register">registration</Link>                
            </form>
        </div>
    </main>
  )
}