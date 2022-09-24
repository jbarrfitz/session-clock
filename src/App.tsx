import React, { useState } from 'react';
import {
  ArrowDropUpSVGIcon,
  ArrowDropDownSVGIcon,
} from '@react-md/material-icons';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [isCountingDown, setIsCountingDown] = useState(false);

  const handleBreakIncrement = (e: React.MouseEvent<SVGElement>) => {
    if (!isCountingDown) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrement = (e: React.MouseEvent<SVGElement>) => {
    if (!isCountingDown) {
      setBreakLength(breakLength < 2 ? 1 : breakLength - 1);
    }
  };

  const handleSessionIncrement = (e: React.MouseEvent<SVGElement>) => {
    if (!isCountingDown) {
      setSessionLength(sessionLength + 1);
    }
  };

  const handleSessionDecrement = (e: React.MouseEvent<SVGElement>) => {
    if (!isCountingDown) {
      setSessionLength(sessionLength < 2 ? 1 : sessionLength - 1);
    }
  };

  return (
    <div className='App'>
      <h1>Session Timer</h1>
      <h4 id='break-label'>Break Length</h4>
      <h4 id='session-label'>Session Length</h4>
      <ArrowDropUpSVGIcon id='break-increment' onClick={handleBreakIncrement} />
      <h3 id='break-length'>5</h3>
      <ArrowDropDownSVGIcon
        id='break-decrement'
        onClick={handleBreakDecrement}
      />
      <ArrowDropUpSVGIcon
        id='session-increment'
        onClick={handleSessionIncrement}
      />
      <h3 id='session-length'>25</h3>
      <ArrowDropDownSVGIcon
        id='session-decrement'
        onClick={handleSessionDecrement}
      />
      <h3>
        <h2 id='timer-label'>Session</h2>
        <h1 id='time-left'>25:00</h1>
      </h3>
      <button>Start/Stop</button>
      <button>Reset</button>
    </div>
  );
}

export default App;
