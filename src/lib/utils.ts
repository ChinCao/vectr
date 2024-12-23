import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lowercaseFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function capitalizeFirstLetter(str: string) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}
export const calculateTimeLeft = (targetDate: Date): TimeLeft | null => {
  const now: Date = new Date();
  const difference: number = targetDate.getTime() - now.getTime();

  if (difference > 0) {
    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
      minutes: String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
      seconds: String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, "0"),
    };
  }
  return null;
};

export interface TimeSince {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export const calculateTimeSince = (pastDate: Date): TimeSince | null => {
  const now: Date = new Date();
  const difference: number = now.getTime() - pastDate.getTime();

  if (difference > 0) {
    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
      minutes: String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
      seconds: String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, "0"),
    };
  }
  return null;
};
