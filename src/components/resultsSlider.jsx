import '../index.css';

import { useEffect } from 'react';

const position = (value, lower, upper) => {
  return (value - lower) / (upper - lower) * 100;
}

/**
 * Slider which allows the user to select a value from a range.
 */
const ResultsSlider = ({ answers, contestant, active }) => {
  let averageAnswer = 0;
  for (const answer of answers) {
    averageAnswer += answer.answer;
  }
  averageAnswer /= answers.length;

  const contestantAnswer = contestant.answer;

  const lower = active.lower;
  const upper = active.upper;

  useEffect(() => {
    const contestant = document.getElementById('contestant');

    const contestantOffset = position(contestantAnswer, lower, upper);
    contestant.style.left = `${contestantOffset}%`;

    const area = document.getElementById('area');
    const areaOffset = position(Math.max(0, contestantAnswer - active.answer), lower, upper);
    area.style.left = `${areaOffset}%`;
    area.style.width = `${(contestantOffset-areaOffset) * 2}%`;
  }, [])

  return (
    <div id='container' className='w-10/12 bg-white outer'>
      <div id='contestant' className='py-8 w-1 bg-black relative top'></div>
      <div id='area' className='py-5 w-1 bg-primary relative below'></div>
      <div id='average' className='py-5 w-1 bg-black relative top'></div>
    </div>
  );
};

export default ResultsSlider;
