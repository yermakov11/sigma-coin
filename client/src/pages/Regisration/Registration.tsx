import Header from "../../components/Header/Header"
import styles from './Registration.module.scss'
import { Link } from "react-router"

export default function Registration() {
  return (
    <main className={styles.container_register}>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.container_form}>
            <h1>Registration</h1>
            <form className={styles.register_form}>
              <input type="text" placeholder="name" />
              <input type="text" placeholder="surname"/>
              <input type="password" placeholder="password"/>
              <input type="email" placeholder="email"/>
              <button type="submit">singup</button>
              <Link to="/login">Login</Link>                
            </form>
        </div>
    </main>
  )
}
