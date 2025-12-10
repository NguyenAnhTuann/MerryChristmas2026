import { useState, useEffect } from 'react';
// 1. Import CSS Modules
import styles from './Countdown.module.css';

// Định nghĩa ngày mục tiêu (25/12/2025 lúc 00:00:00)
const CHRISTMAS_2025 = new Date('2025-12-25T00:00:00').getTime(); 

// --- Component Con: TimeBox (Dùng CSS thuần) ---
interface TimeBoxProps {
  value: string | number;
  label: string;
}

const TimeBox: React.FC<TimeBoxProps> = ({ value, label }) => (
  <div className={styles.timeBox}>
    <div className={styles.value}>
      {value}
    </div>
    <div className={styles.label}>
      {label}
    </div>
  </div>
);


// --- Component Chính: Countdown (Dùng CSS thuần) ---
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(CHRISTMAS_2025 - Date.now()); 

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const difference = CHRISTMAS_2025 - now; 

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        return;
      }

      setTimeLeft(difference);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Hàm chuyển đổi mili-giây thành Ngày, Giờ, Phút, Giây (Giữ nguyên)
  const calculateTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);
    
    const pad = (num: number) => String(num).padStart(2, '0');

    return {
      days: days,
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
    };
  };
  
  const time = calculateTime(timeLeft);

  return (
    // Sử dụng class CSS thuần
    <div className={styles.countdownContainer}>
      
      <h1 className={styles.title}>
        <span role="img" aria-label="santa">🎅</span> Đếm ngược đến Giáng sinh **2025** <span role="img" aria-label="gift">🎁</span>
      </h1>

      {timeLeft > 0 ? (
        <div className={styles.timeBoxes}>
          <TimeBox value={time.days} label="Ngày" />
          <TimeBox value={time.hours} label="Giờ" />
          <TimeBox value={time.minutes} label="Phút" />
          <TimeBox value={time.seconds} label="Giây" />
        </div>
      ) : (
        <h2 className={styles.celebration}>
          Chúc mừng Giáng sinh! 🎉
        </h2>
      )}

    </div>
  );
};

export default Countdown;