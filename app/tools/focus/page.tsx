"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FocusTimerPage() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (seconds === 0) setRunning(false);
  }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Focus Timer</h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Pomodoro</CardTitle>
          <CardDescription>
            25 minutes deep work, 5 minutes rest.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-5xl font-mono text-center">
            {mm}:{ss}
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setRunning((r) => !r)} className="flex-1">
              {running ? "Pause" : "Start"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSeconds(25 * 60);
                setRunning(false);
              }}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
