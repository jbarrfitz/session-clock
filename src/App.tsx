import React, { useState, useEffect } from 'react';
import {
  ArrowUpwardSVGIcon,
  ArrowDownwardSVGIcon,
} from '@react-md/material-icons';

function App() {
  const defaultTimer = { break: 5, session: 25 };
  const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>();
  const [countdownTime, setCountdownTime] = useState<number>(25);
  const [intervalTime, setIntervalTime] = useState<number>(25);

  const handleReset = () => {
    clearInterval(timerId);
    setTimerId(undefined);
  };

  const handleAdjustInterval = (adjustment: number = 1) => {
    //interval adjustments are in minutes; adds/subtracts 60 seconds from timer
    setIntervalTime(intervalTime + adjustment * 60);
  };

  const handleStartStop = () => {
    if (timerId) {
      return clearInterval(timerId);
    }
    const intervalId = setInterval(() => {
      const nextTime = countdownTime - 1;
      setCountdownTime(nextTime);
      if (!nextTime) {
        handleReset();
      }
    }, 1000);
    setTimerId(intervalId);
  };

  return (
    <div className='App'>
      <h1>Session Timer</h1>
      <h4 id='break-label'>Break Length</h4>
      <h4 id='session-label'>Session Length</h4>
      <ArrowUpwardSVGIcon
        id='break-increment'
        onClick={() => handleAdjustInterval(1)}
      />
      <h3 id='break-length'>{breakMinutes}</h3>
      <ArrowDownwardSVGIcon
        id='break-decrement'
        onClick={handleBreakDecrement}
      />
      <ArrowUpwardSVGIcon
        id='session-increment'
        onClick={handleSessionIncrement}
      />
      <h3 id='session-length'>{sessionMinutes}</h3>
      <ArrowDownwardSVGIcon
        id='session-decrement'
        onClick={handleSessionDecrement}
      />
      <h2 id='timer-label'>Session: </h2>
      <>
        {!timerId ? null : Math.floor(countdownTime / 60)}:
        {countdownTime - Math.floor(countdownTime / 60) * 60 < 10
          ? `0${countdownTime - Math.floor(countdownTime / 60)}`
          : countdownTime - Math.floor(countdownTime / 60)}
      </>
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
