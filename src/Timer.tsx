import React, { useEffect, useState, useCallback } from 'react';

import {
  Card,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardActions,
  CardHeader,
} from "@react-md/card";
import { Button } from "@react-md/button";
import { Typography } from "@react-md/typography";
import { TextIconSpacing } from "@react-md/icon";
import {
  PlayArrowSVGIcon,
  PauseSVGIcon,
  UndoSVGIcon,
  ReplaySVGIcon,
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

const Timer = () => {
  const defaultTimer = 25 * 60;
  const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>();
  const [countdownTime, setCountdownTime] = useState<number>(defaultTimer);
  const [intervalTime, setIntervalTime] = useState<number>(defaultTimer);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);

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
        return nextTime || 0;
      });
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
      <Card raisable>
        <CardHeader>
          <CardActions>
          <CardTitle>
            {displayTime(countdownTime)}
          </CardTitle>
          <Button theme="primary" onClick={handleStartStop}>
            <TextIconSpacing icon={isCountingDown ? <PauseSVGIcon /> : <PlayArrowSVGIcon />}>
              {isCountingDown ? 'Stop' : 'Start'}
            </TextIconSpacing>
          </Button>
          <Button onClick={handleReset}>
            <TextIconSpacing icon={<ReplaySVGIcon/>}>
              Reset
            </TextIconSpacing>
          </Button>
        </CardActions>
        </CardHeader>
        <CardContent>
          <Typography>
            Press start to begin a timer. Use the buttons at the bottom right to add or remove minutes from the timer
          </Typography>
        </CardContent>
        <CardActions>
          <CardSubtitle>Interval: {intervalTime / 60}:00</CardSubtitle>
          <Button theme="secondary" onClick={() => handleAdjustInterval(1)}>
            <TextIconSpacing icon={<ArrowUpwardSVGIcon/>}>
              Increment
            </TextIconSpacing>
          </Button>
          <Button theme="secondary" onClick={() => handleAdjustInterval(-1)}>
            <TextIconSpacing icon={<ArrowDownwardSVGIcon/>}>

              Decriment
            </TextIconSpacing>
          </Button>
        </CardActions>
      </Card>
  );
}

export default Timer;
