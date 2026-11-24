"use client";

import { useEffect, useState } from "react";
import { formatAsuncionTime } from "@/lib/clock";

/** Live time in Asunción. Renders "--:--" on the server and fills in after load. */
export function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatAsuncionTime(new Date()));
    tick();
    const timer = window.setInterval(tick, 15_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="hidden py-1 sm:inline">
      Asunción <time aria-label="Local time in Asunción">{time ?? "--:--"}</time> · UTC-3
    </span>
  );
}
