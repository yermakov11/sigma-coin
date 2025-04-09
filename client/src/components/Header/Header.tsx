import coin_img from "../../assets/sigma-coin-img.png";
import styles from "./Header.module.scss";
import profile_img from "../../assets/Ellipse 5.png";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className={styles.container_header}>
      <div className={styles.img_header}>
        <img src={coin_img} alt="error" />
        <h1>Sigma coin</h1>
      </div>
      <div className={styles.links_nav}>
        <nav>
          <ul>
            <li>
              <button>sigmas</button>
            </li>
            <Link to="/about">
              <li>
                <button>about us</button>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className={styles.profile}>
        <img src={profile_img} alt="error" />
      </div>
    </header>
  );
};

export default Header;
