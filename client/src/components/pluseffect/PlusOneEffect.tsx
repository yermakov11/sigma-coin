import React, { useEffect, useState } from "react";
import "./PlusOneEffect.scss";

interface PlusOneEffectProps {
  x: number;
  y: number;
  onRemove: () => void;
}

const PlusOneEffect: React.FC<PlusOneEffectProps> = ({ x, y }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000); 
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="plus-one" style={{top: `${x}px`, bottom:`${y}px`}}>
      +1
    </div>
  );
};

export default PlusOneEffect;
