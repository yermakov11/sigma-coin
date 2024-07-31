import './Main.scss'
import { useAuth } from '../../contexts/AuthContext'
export default function Main() {
  const {logout} = useAuth();
  return (
    <div>   
       <h2>Profile page</h2>
       <button onClick={logout}>Logout</button>
    </div>
  )
}
