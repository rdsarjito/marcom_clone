import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (path?: string) => {
  if (!path) return ""; // atau bisa kembalikan placeholder default
  return `http://localhost:5000/${path}`;
};

export function convertFormData(data: any, formData = new FormData(), parentKey = "") {
  if (
    data === null ||
    data === undefined ||
    data === "" ||
    data === false ||
    data === true
  ) return;

  if (Array.isArray(data)) {
    data.forEach((value, index) => {
      const key = `${parentKey}[${index}]`;
      convertFormData(value, formData, key);
    });
  } else if (typeof data === "object" && !(data instanceof File)) {
    Object.entries(data).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      // Mengonversi tanggal menjadi string ISO
      if (value instanceof Date) {
        formData.append(fullKey, value.toISOString()); // Pastikan tanggal dikirim dalam format yang benar
      } else {
        convertFormData(value, formData, fullKey);
      }
    });
  } else {
    formData.append(parentKey, data);
  }

  return formData;
}
