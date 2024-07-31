import './Header.scss'
import { NavLink } from 'react-router-dom'
export default function Header() {
  return (
    <header>
        <div className='block_header'>
            <img src="../../public/img/coin.png" className="sigma_img" alt="error"/>
            <h1>SIGMA COIN</h1>
        </div>
        <div className='list-bar'>
          <ul>
            <li>sigmas</li>
            <li>add sigma</li>
            <li>about us</li>
          </ul>
        </div>
        <div className='profile_icon'>
          <img src='../../public/img/profile.png' alt='user'/>
        </div>
    </header>
  )
}
