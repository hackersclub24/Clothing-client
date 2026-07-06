"use client";

import { announcementItems } from "@/data/site";

export default function AnnouncementBar() {
  // Triple-duplicate so the marquee never shows a gap
  const items = [...announcementItems, ...announcementItems, ...announcementItems];

  return (
    <div
      className="bg-[#1a1714] text-[#b8a98a] py-[9px] select-none"
      style={{
        overflow: "hidden",           // kills the scrollbar
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 38s linear infinite" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="shrink-0 inline-flex items-center"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 300,
            }}
          >
            {item}
            {/* Decorative diamond separator */}
            <span
              style={{
                margin: "0 28px",
                color: "#6b5e4a",
                fontSize: "8px",
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
