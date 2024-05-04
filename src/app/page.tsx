"use client";
import CurrentlyWorking from "@/components/CurrentlyWorking";
import { useLanguage } from "../hooks/useLanguage";

import "../locales";

export default function Home() {
  useLanguage()
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <CurrentlyWorking />
    </div>
  );
}
