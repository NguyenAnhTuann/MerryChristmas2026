import React, { useEffect, useState } from "react";

const TARGET_DATE = new Date("2025-12-25T00:00:00").getTime();

export default function ChristmasCountdownWarm() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [lang, setLang] = useState("vi");

  function getTimeRemaining() {
    const now = new Date().getTime();
    const diff = TARGET_DATE - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      finished: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleLang = () => setLang(lang === "vi" ? "en" : "vi");

  const text = {
    vi: {
      title: timeLeft.finished ? "🎅 Merry Christmas 🎅" : "🎄 Merry Christmas 2025 🎄",
      subtitle: timeLeft.finished ? "Giáng Sinh đã đến!" : "Đếm ngược đến đêm Giáng Sinh",
      footer: "❄️ Chúc bạn một mùa Noel an lành ❄️",
      day: "Ngày",
      hour: "Giờ",
      minute: "Phút",
      second: "Giây",
    },
    en: {
      title: timeLeft.finished ? "🎅 Merry Christmas 🎅" : "🎄 Merry Christmas 2025 🎄",
      subtitle: timeLeft.finished ? "Christmas has arrived!" : "Countdown to Christmas Eve",
      footer: "❄️ Wishing you a Merry Christmas ❄️",
      day: "Days",
      hour: "Hours",
      minute: "Minutes",
      second: "Seconds",
    },
  };

  const flagIcons = {
    vi: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1280px-Flag_of_Vietnam.svg.png",
    en: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/960px-Flag_of_the_United_States.svg.png",
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <img
          src={lang === "vi" ? flagIcons.vi : flagIcons.en}
          alt="language toggle"
          style={styles.langButton}
          onClick={toggleLang}
        />
        <h1 style={styles.title}>{text[lang].title}</h1>
        <p style={styles.subtitle}>{text[lang].subtitle}</p>

        <div style={styles.timer}>
          <TimeBox label={text[lang].day} value={timeLeft.days} />
          <TimeBox label={text[lang].hour} value={timeLeft.hours} />
          <TimeBox label={text[lang].minute} value={timeLeft.minutes} />
          <TimeBox label={text[lang].second} value={timeLeft.seconds} />
        </div>

        <div style={styles.footer}>{text[lang].footer}</div>
        <div style={styles.creator}>
          <a
            href="https://www.facebook.com/NguyenAnhTuxn"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.creatorLink}
          >
            Nguyen Anh Tuan
          </a>
        </div>
      </div>
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div style={styles.box}>
      <div style={styles.number}>{value}</div>
      <div style={styles.label}>{label}</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.6)), url(https://i.pinimg.com/originals/97/25/3c/97253c13ece372b41aed33aee11c7b96.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  container: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "2px solid rgba(255,215,0,0.8)",
    borderRadius: 25,
    padding: "50px 60px",
    textAlign: "center",
    boxShadow: "0 0 60px rgba(255,215,0,0.6)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    position: "relative",
  },
  langButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 26,
    cursor: "pointer",
    border: "2px solid #fff",
    borderRadius: 5,
  },
  title: {
    fontSize: "3.5rem",
    color: "#ffd700",
    textShadow: "0 0 20px rgba(255,215,0,0.9)",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ffebcd",
    marginBottom: 35,
    fontSize: "1.2rem",
  },
  timer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 25,
  },
  box: {
    background: "linear-gradient(145deg, #ff6f61, #b22222)",
    borderRadius: 20,
    padding: "25px 20px",
    boxShadow:
      "5px 5px 15px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.2)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "default",
  },
  number: {
    fontSize: "2.8rem",
    fontWeight: 700,
    textShadow: "0 0 10px rgba(255,215,0,0.8)",
  },
  label: {
    marginTop: 6,
    fontSize: "1rem",
    color: "#ffd700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  footer: {
    marginTop: 35,
    color: "#ffd700",
    fontSize: "1.1rem",
    textShadow: "0 0 10px rgba(255,215,0,0.7)",
  },
  creator: {
    marginTop: 15,
    fontSize: "0.85rem",
    color: "#ffd700",
  },
  creatorLink: {
    color: "#ffd700",
    textDecoration: "underline",
  },
};
