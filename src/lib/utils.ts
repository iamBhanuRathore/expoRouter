import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function greetings(): string {
  let ct = new Date().getHours();
  let message: string;
  switch (true) {
    case ct < 12:
      message = "Good Morning!";
      break;
    case ct < 16:
      message = "Good Evening!";
      break;
    case ct < 16:
      message = "Good Night!";
      break;
    default:
      message = "Hello My Friend!";
      break;
  }
  return message;
}

export const catchAsyncErrors = (fn: Function) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      // Handle or log the error
      console.error(
        "An error occurred:",
        error?.response?.data?.message || error.message
      );
      // Return null or any default value if needed
      return null;
    }
  };
};
