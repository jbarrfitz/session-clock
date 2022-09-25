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
  TimerSVGIcon,
  ReplaySVGIcon,
  ArrowUpwardSVGIcon,
  ArrowDownwardSVGIcon,
} from '@react-md/material-icons';

/** TODO: Move to a /utils.ts */
const displayTime = (time: number) => {
  let date = new Date(0);
  date.setSeconds(time);
  return (
    <>
      {date.getMinutes()}:
      {date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}
    </>
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
      const nextInterval = intervalTime + adjustment * 60
      setIntervalTime(nextInterval);
      setCountdownTime(nextInterval)
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
          <CardActions style={{ justifyContent: 'space-between' }}>
          <CardTitle>
            <h2>

            <TextIconSpacing icon={<TimerSVGIcon />}>
              {displayTime(countdownTime)}
            </TextIconSpacing>
            </h2>
          </CardTitle>
          <div>
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
          </div>
        </CardActions>
        </CardHeader>
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography>
            Press start to begin a timer. Use the buttons at the bottom right to add or remove minutes from the timer
          </Typography>
        <CardActions style={{ justifyContent: 'space-between' }}>
          <CardSubtitle>
              <em>
                Interval: {intervalTime / 60}:00
                </em>
            </CardSubtitle>
          <div>
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
          </div>
        </CardActions>
        </CardContent>
      </Card>
  );
}

export default Timer;
