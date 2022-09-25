import React, { useEffect, useState, useCallback } from 'react';
import {
  ArrowUpwardSVGIcon,
  ArrowDownwardSVGIcon,
} from '@react-md/material-icons';

/** TODO: Move to a /utils.ts */
const displayTime = (time: number) => {
  let date = new Date(0);
  date.setSeconds(time);
  return (
    <h2>
      {date.getMinutes()}:
      {date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}
    </h2>
  );
};

function App() {
  const defaultTimer = 25 * 60;
  const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>();
  const [countdownTime, setCountdownTime] = useState<number>(defaultTimer);
  const [intervalTime, setIntervalTime] = useState<number>(defaultTimer);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  // const isCountingDown = !!timerId;

  const handleReset = useCallback(() => {
    clearInterval(timerId);
    setTimerId(undefined);
    setCountdownTime(intervalTime);
    setIsCountingDown(false);
  }, [timerId, intervalTime]);

  const handleAdjustInterval = (adjustment: number = 1) => {
    //interval adjustments are in minutes; adds/subtracts 60 seconds from timer
    if (!isCountingDown) {
      setIntervalTime(intervalTime + adjustment * 60);
    }
  };

  const handleStartStop = () => {
    setIsCountingDown((prev) => !prev);
    console.log('handleStartStop', { timerId, isCountingDown, intervalTime });
    if (timerId) {
      console.log('Clear interval');
      clearInterval(timerId);
      setTimerId(undefined);
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
      <span>{isCountingDown ? 'STARTED' : 'STOPPED'}</span>
    </div>
  );
}

export default App;
