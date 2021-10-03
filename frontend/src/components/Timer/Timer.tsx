import { useState, useEffect, useMemo } from "react";
import styles from "./Timer.module.scss";

interface Props {
  startDate: string;
  endDate?: string;
}

export const Timer = ({ startDate, endDate }: Props) => {
  const [time, setTime] = useState<string>("00:00");

  const initialDate = useMemo(() => {
    return new Date(startDate);
  }, [startDate]);

  const finalDate = useMemo(() => {
    return endDate ? new Date(endDate) : undefined;
  }, [endDate]);

  useEffect(() => {
    const updateTime = (endTime: Date) => {
      const timeDifferenceInSeconds =
        (endTime.getTime() - initialDate.getTime()) / 1000;
      const minutes = Math.floor(timeDifferenceInSeconds / 60).toString();
      const seconds = Math.floor(timeDifferenceInSeconds % 60).toString();
      setTime(
        `${minutes.length <= 1 ? `0${minutes}` : minutes}:${
          seconds.length <= 1 ? `0${seconds}` : seconds
        }`
      );
    };
    if (finalDate) {
      updateTime(finalDate);
      return;
    }
    updateTime(new Date());
    const timer = setInterval(() => updateTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [initialDate, finalDate]);

  return <div className={styles.timer}>{time}</div>;
};

export default Timer;
