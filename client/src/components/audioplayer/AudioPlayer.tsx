import { useState, useRef, useEffect } from "react";
import './AudioPlayer.scss';

interface Song {
  url: string;
  title: string;
}

interface AudioProps {
  songs: Song[];
}

export default function AudioPlayer({ songs }: AudioProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
      audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
        audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Number(event.target.value);
      setCurrentTime(audio.currentTime);
    }
  };

  
  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  return (
    <div className="player-card">
      <h2>{songs[currentSongIndex].title}</h2>
      <audio ref={audioRef} src={songs[currentSongIndex].url}/>
      <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />
      <div className="controls">
        <button onClick={handlePrev}>{"<"}</button>
        <button onClick={()=>setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={handleNext}>{">"}</button>
      </div>
    </div>
  );
}
