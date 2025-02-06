"use client";

import {calculateTimeLeft, TimeLeft} from "@/lib/utils";
import {useEffect, useState, useMemo} from "react";
import {Card} from "@/components/ui/card";

interface CountdownProps {
  targetDate: Date;
  countdownTitle: string;
  expiredText: string;
}

const Countdown = ({targetDate, countdownTitle, expiredText}: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>({days: "99", hours: "99", minutes: "99", seconds: "99"});

  useEffect(() => {
    if (calculateTimeLeft(targetDate)) {
      const timer = setInterval(async () => {
        const newTimeLeft = calculateTimeLeft(targetDate);
        setTimeLeft(newTimeLeft);
        if (newTimeLeft === null) {
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeLeft(null);
    }
  }, [targetDate]);

  const memoizedCards = useMemo(
    () => (
      <div className="h-[150px] w-full flex items-center justify-center gap-4 sm:gap-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <Card className="flex flex-col gap-4 items-center justify-center p-4 min-w[35px] min-h-[35px] sm:min-w-[90px] sm:min-h-[90px] border-primary">
            <h1 className="font-bold text-3xl text-primary">{timeLeft?.days}</h1>
          </Card>
          <h1 className="font-semibold text-gray-500">DAYS</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Card className="flex flex-col gap-4 items-center justify-center p-4 min-w[35px] min-h-[35px] sm:min-w-[90px] sm:min-h-[90px] border-primary">
            <h1 className="font-bold text-3xl text-primary">{timeLeft?.hours}</h1>
          </Card>
          <h1 className="font-semibold text-gray-500">HOURS</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Card className="flex flex-col gap-4 items-center justify-center p-4 min-w[35px] min-h-[35px] sm:min-w-[90px] sm:min-h-[90px] border-primary">
            <h1 className="font-bold text-3xl text-primary">{timeLeft?.minutes}</h1>
          </Card>
          <h1 className="font-semibold text-gray-500">MINUTES</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Card className="flex flex-col gap-4 items-center justify-center p-4 min-w[35px] min-h-[35px] sm:min-w-[90px] sm:min-h-[90px] border-primary">
            <h1 className="font-bold text-3xl text-primary">{timeLeft?.seconds}</h1>
          </Card>
          <h1 className="font-semibold text-gray-500">SECONDS</h1>
        </div>
      </div>
    ),
    [timeLeft]
  );

  return (
    <>
      {timeLeft ? (
        <div className="container pt-4 flex flex-col items-center justify-center px-2">
          <h1 className="text-primary uppercase font-bold text-2xl text-center text-balance">{countdownTitle}</h1>
          {memoizedCards}
        </div>
      ) : (
        <h1 className="text-red-600 text-balance text-center uppercase font-bold text-2xl mt-4">{expiredText}</h1>
      )}
    </>
  );
};

export default Countdown;
