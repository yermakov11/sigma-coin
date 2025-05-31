import { useRef, useState } from "react";
import styles from "./CountCoins.module.scss";
import count_coins_icon from "../../assets/count_coins_icon.png";
import simga_stay from "../../assets/sigma_stay.png";
import sigma_action from "../../assets/sigma_action.jpg";

export default function CountCoins() {
  const countCoins = useRef<number>(0);
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [image, setImage] = useState<string>(sigma_action);

  const clickHandler = () => {
    countCoins.current++;
    setDisplayCount(countCoins.current);
    setImage(simga_stay);
  };

  return (
    <div className={styles.container_count_coins}>
      <div className={styles.count_coins}>
        <img src={count_coins_icon} alt="coin icon" />
        <p>{displayCount}</p>
      </div>
      <div className={styles.click_button}>
         <img onClick={clickHandler} src={image} alt="error" />
      </div>
    </div>
  );
}
