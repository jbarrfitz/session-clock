import React, { useEffect, useState, useCallback } from "react";

import {
  Card,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardActions,
  CardHeader,
} from "@react-md/card";
import { Button } from "@react-md/button";
import { Slider, useSlider } from "@react-md/form";
import { Typography } from "@react-md/typography";
import { TextIconSpacing } from "@react-md/icon";
import {
  PlayArrowSVGIcon,
  PauseSVGIcon,
  TimerSVGIcon,
  AddSVGIcon,
  RemoveSVGIcon,
  ReplaySVGIcon,
} from "@react-md/material-icons";

import { displayTime } from "./utils";

const Timer = () => {
  const defaultTimer = 25 * 60;
  const [step, stepControls] = useSlider(1, { min: 1, max: 60 });
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
      const nextInterval = intervalTime + adjustment * 60;
      setIntervalTime(nextInterval);
      setCountdownTime(nextInterval);
    }
  };

  const handleStartStop = useCallback(() => {
    setIsCountingDown((prev) => !prev);
    if (timerId) {
      clearInterval(timerId);
      setTimerId(undefined);
      return;
    }
    const intervalId = setInterval(() => {
      setCountdownTime((prev) => {
        const nextTime = prev - 1;
        return nextTime || 0;
      });
    }, 1000);
    setTimerId(intervalId);
  }, [timerId]);

  useEffect(() => {
    if (timerId && !countdownTime) {
      handleReset();
    }
  }, [timerId, countdownTime, handleReset]);

  return (
    <Card raisable>
      <CardHeader>
        <CardActions style={{ justifyContent: "space-between" }}>
          <CardTitle>
            <h2>
              <TextIconSpacing icon={<TimerSVGIcon />}>
                {displayTime(countdownTime)}
              </TextIconSpacing>
            </h2>
          </CardTitle>
          <div>
            <Button onClick={handleReset}>
              <TextIconSpacing icon={<ReplaySVGIcon />}>Reset</TextIconSpacing>
            </Button>
            <Button
              theme="primary"
              themeType="contained"
              onClick={handleStartStop}
            >
              <TextIconSpacing
                icon={isCountingDown ? <PauseSVGIcon /> : <PlayArrowSVGIcon />}
              >
                {isCountingDown ? "Stop" : "Start"}
              </TextIconSpacing>
            </Button>
          </div>
        </CardActions>
      </CardHeader>
      <CardContent>
        <Typography>
          Press start to begin a timer. Use the buttons at the bottom right to
          add or remove minutes from the timer
        </Typography>
        <CardSubtitle>Adjust duration:</CardSubtitle>
        <CardActions style={{ justifyContent: "space-between" }}>
          <Button
            theme="secondary"
            onClick={() => handleAdjustInterval(-step)}
            disabled={isCountingDown || intervalTime - step * 60 <= 0}
          >
            <TextIconSpacing icon={<RemoveSVGIcon />}>
              {`${step}m`}
            </TextIconSpacing>
          </Button>
          <Slider
            style={{ flexGrow: 1 }}
            baseId="step"
            discrete
            // beforeAddon={<RemoveSVGIcon onClick={() => !isCountingDown && step > stepControls.min && stepControls.setValue(step - 1)} />}
            // afterAddon={<AddSVGIcon onClick={() => !isCountingDown && step < stepControls.max && stepControls.setValue(step + 1)} />}
            {...stepControls}
            disabled={isCountingDown}
          />
          <Button
            theme="secondary"
            onClick={() => handleAdjustInterval(step)}
            disabled={
              isCountingDown || intervalTime + step * 60 >= 24 * 60 * 60 - 1
            }
          >
            <TextIconSpacing icon={<AddSVGIcon />}>
              {`${step}m`}
            </TextIconSpacing>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Timer;
