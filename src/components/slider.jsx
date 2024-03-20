import "../index.css";
import { clamp } from "../utils/math";

import { useState } from "react";

const range = (start, stop, step = 1) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );

/**
 * Slider which allows the user to select a value from a range.
 */
const Slider = ({ value, setValue, lower, upper }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(0);

  const offset = 100;
  const xCenter = window.innerWidth / 2;

  const computeValue = (event) => {
    const leftmost = document.querySelector(".leftmost");

    const box = document.getElementById("box");
    const left = leftmost.getBoundingClientRect().left;
    // Figure out which number is below the pointer
    const num = Math.round((xCenter - left - offset/2) / offset);

    const newPosition = event.pageX;
    const diff = newPosition - position;
    box.style.transform = `translate(${clamp(diff, -box.getBoundingClientRect().width, box.getBoundingClientRect().width)}px)`;

    const newValue = clamp(value + diff, lower, upper);
    setValue(num);
  };

  // Drag'n'drop functionality
  const begindrag = (event) => {
    event.preventDefault();
    setPosition(event.pageX);
    setDragging(true);
  };

  const enddrag = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const dragndrop = (event) => {
    event.preventDefault();
    if (dragging) computeValue(event);
  };

  return (
    <div className="w-full">
      {/* Show the value above the slider */}
      <div className="w-1/12 mx-auto">
        <div className="w-full bg-primary">{value}</div>
        <div
          className="size-1/12 mx-auto
                    border-l-[20px] border-l-transparent
                    border-t-[25px] border-t-primary
                    border-r-[20px] border-r-transparent"
        ></div>
      </div>

      {/* Main slider */}
      <div
        className="w-full bg-white"
        onMouseMove={dragndrop}
        onMouseDown={begindrag}
        onMouseUp={enddrag}
        onMouseLeave={enddrag}
      >
        <div id="box" className="w-full bg-transparent">
          {range(lower, upper, 1).map((i) => (
            <span key={i} className={i == 0 ? "leftmost" : ""} style={{display: 'inline-block', width: `${offset}px`}}>
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
