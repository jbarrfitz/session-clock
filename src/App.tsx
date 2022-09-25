import React, { useEffect, useState, useCallback } from 'react';
import {
  ArrowUpwardSVGIcon,
  ArrowDownwardSVGIcon,
} from '@react-md/material-icons';

function App() {
  const defaultTimer = 25 * 60;
  const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>();
  const [countdownTime, setCountdownTime] = useState<number>(defaultTimer);
  const [intervalTime, setIntervalTime] = useState<number>(defaultTimer);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);

  const handleReset = useCallback(() => {
    clearInterval(timerId);
    setTimerId(undefined);
    setCountdownTime(intervalTime);
  }, [timerId, intervalTime]);

  const displayTime = (time: number) => {
    let date = new Date(0);
    date.setSeconds(countdownTime);
    return (
      <h2>
        {date.getMinutes()}:
        {date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}
      </h2>
    );
  };

  const handleAdjustInterval = (adjustment: number = 1) => {
    //interval adjustments are in minutes; adds/subtracts 60 seconds from timer
    if (!isCountingDown) {
      setIntervalTime(intervalTime + adjustment * 60);
    }
  };

  const handleStartStop = () => {
    setIsCountingDown((prev) => !prev);
    if (timerId) {
      return clearInterval(timerId);
    }
    const intervalId = setInterval(() => {
      const nextTime = countdownTime - 1;
      console.log(timerId, countdownTime, nextTime);
      setCountdownTime((prev) => {
        const nextTime = prev - 1;
        // if (!nextTime) {
        //   handleReset();
        // }
        return nextTime || 0;
      });
      // });
      // if (!nextTime) {
      //   handleReset();
      // }
    }, 1000);
    setTimerId(intervalId);
  };

  useEffect(() => {
    if (timerId && !countdownTime) {
      handleReset();
    }
  }, [timerId, countdownTime, handleReset]);

  console.log(timerId, countdownTime);
  return (
    <div className='App'>
      <h1>Session Timer</h1>
      <ArrowUpwardSVGIcon
        id='session-increment'
        onClick={() => handleAdjustInterval(1)}
      />
      <h3 id='session-length'>{intervalTime / 60}</h3>
      <ArrowDownwardSVGIcon
        id='session-decrement'
        onClick={() => handleAdjustInterval(-1)}
      />
      <h2 id='timer-label'>Session: </h2>
      {displayTime(countdownTime)}
      <button id='start-stop' onClick={handleStartStop}>
        Start/Stop
      </button>
      <button id='reset-button' onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;
