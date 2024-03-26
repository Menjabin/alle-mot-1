import '../index.css';

import { useEffect, useState } from 'react';

const range = (start, stop, step = 1) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );

/**
 * Slider which allows the user to select a value from a range.
 */
const Slider = ({ value, setValue, lower, upper }) => {
  const offset = 50;
  const xCenter = window.innerWidth / 2;

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(xCenter);
  const [translation, setTranslation] = useState(0);

  useEffect(() => {
    setValue(Math.round((upper - lower) / 2));
    computeValue({ pageX: xCenter });
  }, [])

  const computeValue = (event) => {
    const leftmost = document.querySelector('.leftmost');

    const box = document.getElementById('box');
    const left = leftmost.getBoundingClientRect().left;
    // Figure out which number is below the pointer
    const num = Math.round((xCenter - left - offset/2) / offset);

    const newPosition = event.pageX || event.touches[0].pageX;
    const diff = newPosition - position;
    setPosition(newPosition);
    setTranslation(current => {
      if (num <= lower && diff > 0) return current;
      if (num >= upper && diff < 0) return current;
      return current + diff;
    });
    box.style.transform = `translate(${translation}px)`;

    setValue(num);
  };

  // Drag'n'drop functionality
  const begindrag = (event) => {
    event.preventDefault();
    setPosition(event.pageX || event.touches[0].pageX);
    setDragging(true);
  };

  const enddrag = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const drag = (event) => {
    event.preventDefault();
    if (dragging) computeValue(event);
  };

  return (
    <div className='w-full'>
      {/* Show the value above the slider */}
      <div className='w-24 mx-auto'>
        <div className='w-full bg-primary py-1'>{value}</div>
        <div
          className='size-1/12 mx-auto
                    border-l-[20px] border-l-transparent
                    border-t-[25px] border-t-primary
                    border-r-[20px] border-r-transparent'
        ></div>
      </div>

      {/* Main slider */}
      <div
        className='w-full bg-white'
        onMouseMove={drag}
        onMouseDown={begindrag}
        onMouseUp={enddrag}
        onMouseLeave={enddrag}
        onTouchMove={drag}
        onTouchStart={begindrag}
        onTouchEnd={enddrag}
      >
        <div id='box' className='py-5 w-full bg-transparent whitespace-nowrap select-none'>
          {range(lower, upper, 1).map((i) => (
            <span
              key={i}
              className={i == 0 ? 'leftmost' : ''}
              style={{display: 'inline-block', width: `${offset}px`}}
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
