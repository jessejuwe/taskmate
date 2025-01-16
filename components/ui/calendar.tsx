"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

import { Button } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        today: `border-none rounded-full text-green-500`,
        selected: "rounded-full text-white bg-green-500",
        chevron: `fill-green-500`,
        // months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        // month: "space-y-4",
        // caption: "flex justify-center pt-1 relative items-center",
        // caption_label: "text-sm font-medium",
        // nav: "space-x-1 flex items-center",
        // nav_button: "",
        // nav_button_previous: "absolute left-1",
        // nav_button_next: "absolute right-1",
        // table: "w-full border-collapse space-y-1",
        // head_row: "flex",
        // head_cell:
        //   "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        // row: "flex w-full mt-2",
        // cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        // day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        // range_end: "day-range-end",
        // outside:
        //   "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        // disabled: "text-muted-foreground opacity-50",
        // range_middle:
        //   "aria-selected:bg-accent aria-selected:text-accent-foreground",
        // hidden: "invisible",
        ...classNames,
      }}
      // components={{
      //   Chevron: (props) => {
      //     if (props.orientation === "left") {
      //       return <ChevronLeftIcon size={22} />;
      //     }
      //     return <ChevronRightIcon size={22} />;
      //   },
      // }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
