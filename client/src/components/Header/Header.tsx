import coin_img from '../../assets/sigma-coin-img.png';
import styles from './Header.module.scss';
const Header = () => {
  return (
    <div className={styles.header}>
       <img src={coin_img} alt="error" />
       <h1>Sigma coin</h1>
    </div>
  )
}

export default Header;
