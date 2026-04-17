"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function CalendarSection() {
  const [selected, setSelected] = useState<Date | undefined>();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      {/* TITLE */}
      <div className="border-t border-gray-200 pt-6 md:mt-10">
        <p className="text-xs tracking-[3px] text-gray-500 mb-4">
          AVAILABILITY
        </p>
        <p className="text-gray-400 text-xs">
          Click dates to block availability. All dates are available by default.
        </p>
      </div>

      <div className="border border-gray-200 p-6 rounded-md">
        {/* CALENDAR */}
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          numberOfMonths={2}
          showOutsideDays
          disabled={{
            before: new Date(today.getTime() + 1), // disable today + past
          }}
          className="custom-calendar"
        />

        {/* FOOTER */}
        <div className="text-xs text-gray-400 pt-4 border-t border-gray-200 flex gap-6 items-center justify-center">
          <div className="flex gap-2 items-center">
            <span className="bg-black h-3 w-3 block"></span>
            Available
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-gray-300 h-3 w-3 block"></span>
            Blocked
          </div>
        </div>
      </div>
    </>
  );
}