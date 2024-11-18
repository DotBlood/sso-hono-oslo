import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding/dist/base32";
import { getRandomValues } from "crypto";

// Вспомогательная функция для генерации случайного URL
export function generateRandomUrl(): string {
  const bytes = new Uint8Array(160);
  getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
}

// Вспомогательная функция для генерации даты истечения
export function generateExpirationDate(days: number): Date {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return new Date(Date.now() + days * millisecondsPerDay);
}