import "./Main.scss";
import { useState } from "react";
import sigma from "../../../public/img/sigma.webp";
import onclick from "../../../public/img/onclick.jpg"
export default function Main() {
  const [count, setCount] = useState<number>(0);
  const [image, setImage] = useState(sigma);

  const clickCoin = () => {
      setCount(count+1);
      setImage(prevImage=>prevImage===sigma?onclick:sigma);
  };
  return (
    <main>
      <div className="block_count">
        <img src="../../public/img/coin_click.png" alt="error" />
        <h2>{count}</h2>
      </div>
      <div className="block_click">
        <img src={image} alt="error" onClick={clickCoin}/>
      </div>
    </main>
  );
}
