import { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import styles from "../../../styles/AddSession.module.css";

const Stopwatch = () => {
  const [timerOn, setTimerOn] = useState(false);
  const [timerTime, setTimerTime] = useState(0); //keeps track of elapsed time in milliseconds

  const [timer, setTimer] = useState(null);

  let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
  let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
  let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

  const start = () => {
    setTimerOn(true);

    setTimer(
      setInterval(() => {
        setTimerTime((prevTime) => prevTime + 10);
      }, 10)
    );
  };

  const stop = () => {
    setTimerOn(false);
    clearInterval(timer);
  };
  const reset = () => {
    setTimerTime(0);
  };

  return (
    <Card className={styles.durationInputBox}>
      {timerOn === false && timerTime === 0 && (
        <Button onClick={start}>START</Button>
      )}
      {timerOn === true && <Button onClick={stop}>STOP</Button>}
      {timerOn === false && timerTime > 0 && (
        <Button onClick={start}>RESUME</Button>
      )}
      <Button onClick={reset}>RESET</Button>

      <div className={styles.stopwatchDisplay}>
        {hours}:{minutes}:{seconds}:{centiseconds}
      </div>
    </Card>
  );
};

export default Stopwatch;
