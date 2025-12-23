import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-")
  return `${month}-${day}-${year}`
}

export function dateObjToYYYYMMDD(date: Date) {
  return date.toISOString().split("T")[0]
}

/**
 * Converts a YYYY-MM-DD date string to an ISO 8601 string
 * set to noon (12:00:00) UTC.
 *
 * Example:
 *   "2025-03-08" -> "2025-03-08T12:00:00.000Z"
 */
export function toNoonISO8601(date: string): string {
  // Basic format validation
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Invalid date format: ${date}. Expected YYYY-MM-DD.`)
  }

  const [year, month, day] = date.split("-").map(Number)

  // Months are zero-based in JS Date
  const d = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))

  return d.toISOString()
}
