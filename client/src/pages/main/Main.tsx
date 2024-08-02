import "./Main.scss";
import { useState } from "react";
import AudioPlayer from "../../components/audioplayer/AudioPlayer";
import sigma from "../../../public/img/sigma.webp";
import onclick from "../../../public/img/onclick.jpg";
import { songs } from "../../data/data_music";
import PlusOneEffect from "../../components/pluseffect/PlusOneEffect";


export default function Main() {
  const [count, setCount] = useState<number>(0);
  const [image, setImage] = useState(sigma);
  const [clicks, setClicks] = useState<{ x: number; y: number; id: number }[]>([]);

  const clickCoin = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newClick = {
      x: centerX,
      y: centerY,
      id: Date.now(),
    };

    setClicks(prevClicks => [...prevClicks, newClick]);
    setImage(prevClick=> prevClick===sigma?onclick:sigma)
    setCount(prevCount => prevCount + 1);
  };

  const handleRemove = (id: number) => {
    setClicks(prevClicks => prevClicks.filter(click => click.id !== id));
  };

  return (
    <main>
      <div className="block_count">
        <img src="../../public/img/coin_click.png" alt="error" />
        <h2>{count}</h2>
      </div>
      <div className="block_click" onClick={clickCoin}>
      {clicks.map(click => (
          <PlusOneEffect
            key={click.id}
            x={click.x}
            y={click.y}
            onRemove={() => handleRemove(click.id)}
          />
        ))}
        <img src={image} alt="error" />
      </div>
      <div className="sigma_music">
        <AudioPlayer songs={songs} />
      </div>
    </main>
  );
}
