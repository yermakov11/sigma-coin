import { useState } from "react";
import styles from "./CountCoins.module.scss";
import count_coins_icon from "../../assets/count_coins_icon.png";
import sigma_stay from "../../assets/sigma_stay.png";
import sigma_action from "../../assets/sigma_action.png";

export default function CountCoins() {
  const [coinCount, setCoinCount] = useState<number>(0);
  const [imageSrc, setImageSrc] = useState<boolean>(true);

  const handleClick = () => {
    setCoinCount(prevCount => prevCount + 1);
    setImageSrc(prev=>!prev);
  };

  return (
    <div className={styles.container_count_coins}>
      <div className={styles.count_coins}>
        <img src={count_coins_icon} alt="coin icon" />
        <p>{coinCount}</p>
      </div>
      <div className={styles.click_button}>
        <img onClick={handleClick} src={imageSrc ? sigma_stay: sigma_action } alt="Click button" />
      </div>
    </div>
  );
}
