"use client";

import { useState } from "react";

export default function VirtualizedList({
  numItems,
  itemHeight,
  renderItem,
  windowHeight
}) {

  const [scrollTop, setScrollTop] = useState(0);

  const innerHeight = numItems * itemHeight;

  const startIndex = Math.floor(scrollTop / itemHeight);

  const endIndex = Math.min(
    numItems - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );

  const items = [];

  for (let i = startIndex; i <= endIndex; i++) {

    items.push(
      renderItem({
        index: i,
        style: {
          position: "absolute",
          top: `${i * itemHeight}px`,
          width: "100%"
        }
      })
    );

  }

  const onScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (

<div
  className="overflow-y-scroll scrollbar-hide"
  style={{
    height: windowHeight,
    position: "relative"
  }}
  onScroll={onScroll}
>

      <div
        style={{
          height: innerHeight,
          position: "relative"
        }}
      >

        {items}

      </div>

    </div>

  );
}