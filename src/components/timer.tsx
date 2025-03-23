"use client";
import { outfit } from "@/fonts/fonts";
import { useEffect, useRef, useState } from "react";
import { Timer } from "easytimer.js";
import { Button } from "./ui/button";
import { Pause, Play, TimerReset } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

enum TimerState {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
  STOPPED = "STOPPED",
}

export default function TimerComponent() {
  const [active, setActive] = useState("work");
  const [timerState, setTimerState] = useState<TimerState>(TimerState.IDLE);

  const [hours, sethours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const timerRef = useRef<Timer | null>(null);

  const handleStart = () => {
    setTimerState(TimerState.RUNNING);
    if (timerRef.current) {
      console.log("reached start");
      timerRef.current.start({ startValues: { hours, minutes, seconds } });
    }
  };

  const handleStop = () => {
    setTimerState(TimerState.STOPPED);
    if (timerRef.current) {
      timerRef.current.pause();
    }
  };

  const handleReset = () => {
    setTimerState(TimerState.IDLE);
    if (timerRef.current) {
      timerRef.current.reset();
    }
    sethours(0);
    setSeconds(0);
    setMinutes(0);
  };

  const handleInputChange = (e: any) => {
    if (e.target.value === "") {
      setMinutes(0);
    } else {
      const parsedValue = parseInt(e.target.value);
      setMinutes(parsedValue);
    }
  };

  useEffect(() => {
    timerRef.current = new Timer({
      countdown: true,
    });

    if (timerRef.current) {
      timerRef.current.addEventListener("secondsUpdated", () => {
        setSeconds(timerRef.current?.getTimeValues().seconds as number);
      });

      timerRef.current.addEventListener("minutesUpdated", () => {
        setMinutes(timerRef.current?.getTimeValues().minutes as number);
      });

      timerRef.current.addEventListener("hoursUpdated", () => {
        sethours(timerRef.current?.getTimeValues().hours as number);
      });

      timerRef.current.addEventListener("targetAchieved", () => {
        setTimerState(TimerState.IDLE);
      });
    }

    // cleanup
    return () => {
      timerRef.current?.removeEventListener("secondsUpdated", () => {});
      timerRef.current?.removeEventListener("minutesUpdated", () => {});
      timerRef.current?.removeEventListener("hoursUpdated", () => {});
      timerRef.current?.removeEventListener("targetAchieved", () => {});
    };
  }, []);

  return (
    <div
      className={`w-[36rem] h-4/6 bg-white dark:bg-neutral-900 rounded-xl flex flex-col justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${outfit.className} p-5`}
    >
      {/* tab switch */}
      <div className="w-full rounded-xl flex items-center justify-around bg-neutral-50 dark:bg-neutral-800">
        <div
          onClick={() => setActive("work")}
          className={`w-full flex items-center justify-center  hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] cursor-pointer text-black py-2 m-1 rounded-lg ${
            active === "work" &&
            "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white dark:bg-neutral-900"
          }`}
        >
          <p className="dark:text-white">Work</p>
        </div>
        <div
          onClick={() => setActive("chill")}
          className={`w-full flex items-center justify-center hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] cursor-pointer text-black py-2 m-1 rounded-lg ${
            active === "chill" &&
            "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white dark:bg-neutral-900"
          }`}
        >
          <p className="dark:text-white">Chill</p>
        </div>
      </div>
      {/* tab switch ends */}
      <div className="flex items-center justify-center w-full">
        {timerState === TimerState.RUNNING ||
        timerState === TimerState.STOPPED ? (
          <div className="w-full flex items-center justify-center space-x-1">
            <p className="text-4xl font-semibold">
              {hours.toString().padStart(2, "0")}
            </p>
            <span className="text-3xl">:</span>
            <p className="text-4xl font-semibold">
              {minutes.toString().padStart(2, "0")}
            </p>
            <span className="text-3xl">:</span>
            <p className="text-4xl font-semibold">
              {seconds.toString().padStart(2, "0")}
            </p>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center space-x-10">
            <div className="w-full flex flex-col items-end">
              <Label className="w-full flex items-center justify-end mb-2" htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                value={hours}
                onChange={(e) => sethours(parseInt(e.target.value))}
                className="w-2/6"
                type="number"
                min={0}
              />
            </div>
            <div className="w-full flex flex-col items-start ">
              <Label className="w-full flex items-center justify-start mb-2" htmlFor="minutes">Minutes</Label>
              <Input
                id="minutes"
                value={minutes}
                onChange={handleInputChange}
                className="w-2/6"
                type="number"
                min={0}
              />
            </div>
          </div>
        )}
      </div>

      {/* controls */}
      <div className="w-full h-fit flex justify-center items-center space-x-3 pb-5">
        {timerState === TimerState.RUNNING ? (
          <Button className="flex items-center space-x-2" onClick={handleStop}>
            <Pause />
            Stop
          </Button>
        ) : (
          <Button className="flex items-center space-x-2" onClick={handleStart}>
            <Play />
            Start
          </Button>
        )}
        <Button className="flex items-center space-x-2" onClick={handleReset}>
          <TimerReset />
          Reset
        </Button>
      </div>
      {/* controls ends */}
    </div>
  );
}
