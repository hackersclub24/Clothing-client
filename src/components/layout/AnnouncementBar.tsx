"use client";

import { announcementItems } from "@/data/site";

export default function AnnouncementBar() {
  const items = [...announcementItems, ...announcementItems]; // duplicate for seamless loop

  return (
    <div className="bg-stone-900 text-stone-200 text-[11px] tracking-widest uppercase overflow-hidden py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="mx-8 shrink-0">
            {item}
            <span className="mx-8 text-stone-500">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
