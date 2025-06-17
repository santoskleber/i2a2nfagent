
import { format } from "date-fns"; // já está instalado

export function formatDatetime(date: Date | string): string {
  let d: Date;
  if (typeof date === "string") {
    d = new Date(date);
  } else {
    d = date;
  }
  // Exemplo: 14/06/2025 15:43
  return format(d, "dd/MM/yyyy HH:mm");
}
