import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-");
  return `${month}-${day}-${year}`;
}

export function dateObjToYYYYMMDD(date: Date) {
  return date.toISOString().split("T")[0];
}
