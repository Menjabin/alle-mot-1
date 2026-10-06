import "../index.css";

import { useEffect, useRef, useState } from "react";

const range = (start, stop, step = 1) =>
  Array.from(
    { length: Math.floor((stop - start) / step) + 1 },
    (_, index) => start + index * step,
  );

/**
 * Slider where the numbers move underneath a fixed center indicator.
 *
 * The selected value is determined by which number is underneath
 * the center indicator, rather than by the pointer's position.
 */
const Slider = ({ value, setValue, lower, upper }) => {
  const offset = 50;

  const [dragging, setDragging] = useState(false);
  const [translation, setTranslation] = useState(0);

  const lastPointerPosition = useRef(null);

  /**
   * Set the initial value and position.
   */
  useEffect(() => {
    const initialValue = Math.round((lower + upper) / 2);

    setValue(initialValue);

    const initialTranslation = -(initialValue - lower) * offset;

    setTranslation(initialTranslation);
  }, [lower, upper, setValue]);

  /**
   * Start dragging.
   */
  const beginDrag = (event) => {
    event.preventDefault();

    lastPointerPosition.current = event.clientX;
    setDragging(true);
  };

  /**
   * Move the numbers while dragging.
   */
  const drag = (event) => {
    if (!dragging) return;

    event.preventDefault();

    const currentPosition = event.clientX;
    const previousPosition = lastPointerPosition.current;

    if (previousPosition === null) {
      lastPointerPosition.current = currentPosition;
      return;
    }

    const diff = currentPosition - previousPosition;

    lastPointerPosition.current = currentPosition;

    setTranslation((currentTranslation) => {
      /*
       * Move the number row.
       *
       * Dragging right -> numbers move right
       * Dragging left  -> numbers move left
       */
      let nextTranslation = currentTranslation + diff;

      /*
       * Prevent the row from moving beyond either end.
       */
      const minTranslation = -(upper - lower) * offset;
      const maxTranslation = 0;

      nextTranslation = Math.max(
        minTranslation,
        Math.min(maxTranslation, nextTranslation),
      );

      /*
       * Determine which number is currently underneath
       * the fixed center indicator.
       *
       * Every number is `offset` pixels apart.
       */
      const steps = Math.round(-nextTranslation / offset);

      const newValue = lower + steps;

      setValue(Math.max(lower, Math.min(upper, newValue)));

      return nextTranslation;
    });
  };

  /**
   * Stop dragging.
   */
  const endDrag = () => {
    setDragging(false);
    lastPointerPosition.current = null;
  };

  return (
    <div className="w-full">
      {/* Selected value */}
      <div className="w-24 mx-auto">
        <div className="w-full bg-primary py-1 text-center">{value}</div>

        {/* Fixed center indicator */}
        <div
          className="
            size-1/12 mx-auto
            border-l-[20px] border-l-transparent
            border-t-[25px] border-t-primary
            border-r-[20px] border-r-transparent
          "
        />
      </div>

      {/* Slider viewport */}
      <div
        className={`
          w-full
          bg-white
          overflow-hidden
          ${dragging ? "cursor-grabbing" : "cursor-grab"}
        `}
        onPointerDown={beginDrag}
        onPointerMove={drag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {/* Moving number row */}
        <div
          className="
            py-5
            bg-transparent
            whitespace-nowrap
            select-none
            touch-none
          "
          style={{
            transform: `translateX(${translation}px)`,
            paddingLeft: `calc(50% - ${offset / 2}px)`,
            paddingRight: `calc(50% - ${offset / 2}px)`,
          }}
        >
          {range(lower, upper).map((number) => (
            <span
              key={number}
              className="inline-block text-center"
              style={{
                width: `${offset}px`,
              }}
            >
              {number}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
