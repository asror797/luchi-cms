"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  title: string;
  description?: string;
  duration?: string;
  audioUrl: string;
}

export default function AudioPlayer({
  title,
  description,
  duration,
  audioUrl,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalDuration, setTotalDuration] = useState(duration || "0:00");

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }, [playing]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
    setCurrentTime(formatTime(audio.currentTime));
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration || !isFinite(audio.duration)) return;
    setTotalDuration(formatTime(audio.duration));
  }, []);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
  }, []);

  const handleBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = x / rect.width;
      audio.currentTime = pct * audio.duration;
    },
    []
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleEnded]);

  return (
    <div className={styles.card}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.desc}>{description}</div>}
      <div className={styles.player}>
        <button
          className={styles.playBtn}
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <rect x="1" y="1" width="3.5" height="12" rx="1" fill="white" />
              <rect x="7.5" y="1" width="3.5" height="12" rx="1" fill="white" />
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M1 1l10 6-10 6V1z" fill="white" />
            </svg>
          )}
        </button>
        <div className={styles.barWrap} onClick={handleBarClick}>
          <div className={styles.bar}>
            <div className={styles.barFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
        <span className={styles.time}>
          {playing || progress > 0 ? currentTime : totalDuration}
        </span>
      </div>
    </div>
  );
}
