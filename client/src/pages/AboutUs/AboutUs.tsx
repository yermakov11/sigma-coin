import style from "./AboutUs.module.scss";
import coin_img from "../../assets/sigma-coin-img.png";
import { Link } from "react-router";
export default function AboutUs() {
  return (
    <div className={style.container_description}>
      <div className={style.header}>
        <img src={coin_img} alt="error" />
        <h1>Sigma-Coin</h1>
      </div>
      <div className={style.description}>
        <p>
          Sigma-Coin is an innovative clicker game that allows users to earn
          virtual cryptocurrency by developing their skills and strategies. The
          project combines elements of a classic clicker with mining and
          economic mechanics, providing an engaging gaming experience and the
          opportunity to receive real rewards. Players can earn Sigma coins by
          clicking, completing tasks, and participating in various events. As
          they progress, users can upgrade their equipment, unlock new
          technologies, and optimize their mining operations to increase
          productivity. The game features a dynamic in-game economy, where
          players can trade resources, invest in upgrades, and compete in global
          leaderboards. In addition to its entertaining gameplay, Sigma-Coin
          integrates blockchain-inspired systems, ensuring transparency and a
          sense of real value for virtual assets. Regular events, seasonal
          challenges, and community competitions keep the game fresh and
          competitive, offering players a wide range of ways to earn and grow
          their Sigma Coin holdings. Whether you're a casual gamer looking for a
          fun way to pass the time or a strategy enthusiast aiming to dominate
          the leaderboard, Sigma-Coin offers an exciting blend of simplicity,
          depth, and reward-driven gameplay.Want me to make it more formal, more
          casual, or add something like lore or storyline elements?
        </p>
      </div>
      <div className={style.back}>
        <Link to="/main-page">
          <button>back to profile</button>
        </Link>
      </div>
    </div>
  );
}
