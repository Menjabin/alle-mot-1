import '../index.css';

import { useEffect } from 'react';

const position = (value, lower, upper) => {
  return (value - lower) / (upper - lower) * 100;
}

/**
 * Slider which shows the contestant result,
 * and the average result when the space bar is pressed.
 */
const ResultsSlider = ({ answers, contestant, active }) => {
  let averageAnswer = 0;
  for (const answer of answers) {
    averageAnswer += answer.answer;
  }
  averageAnswer = Math.round(averageAnswer / answers.length);
  console.log(averageAnswer);

  const contestantAnswer = contestant.answer;

  const lower = active.lower;
  const upper = active.upper;

  useEffect(() => {
    const contestant = document.getElementById('contestant');
    const contestantOffset = position(contestantAnswer, lower, upper);
    contestant.style.left = `${contestantOffset}%`;

    const answer = document.getElementById('answer');
    const answerOffset = position(active.answer, lower, upper);
    answer.style.left = `${answerOffset}%`;

    const area = document.getElementById('area');
    const areaOffset = Math.max(answerOffset - Math.abs(answerOffset - contestantOffset), 0);
    area.style.left = `${areaOffset}%`;
    area.style.width = `${Math.abs(answerOffset - contestantOffset) * 2}%`;

    const contestantText = document.getElementById('contestant-text');
    contestantText.style.left = `${contestantOffset-0.3}%`;

    const answerText = document.getElementById('answer-text');
    answerText.style.left = `${answerOffset-0.3}%`;

    document.body.onkeyup = async e => {
      if (e.key === ' ' || e.code === 'Space')
      {
        const average = document.getElementById('average');
        average.style.visibility = 'visible';
    
        const averageText = document.getElementById('average-text');
        averageText.style.visibility = 'visible';

        const averageOffset = position(averageAnswer, lower, upper);
        for (let pos = 0; pos <= averageOffset; pos+=0.1)
        {
          average.style.left = `${pos}%`;
          averageText.style.left = `${pos-0.3}%`;
          averageText.innerHTML = Math.round((pos/100) * upper);
          await new Promise(r => setTimeout(r, 5));
        }
      }
    }
  }, [])

  return (
    <div className='w-10/12 mx-auto'>
      <div className='w-full outer'>
        <span id='contestant-text' className='text-white w-1 relative block top'>{contestantAnswer}</span>
        <span id='answer-text' className='text-white w-1 relative block top'>{active.answer}</span>
        <span id='average-text' className='text-white w-1 relative block top invisible'>0</span>
      </div>
      <div id='container' className='w-full bg-white outer'>
        <div id='contestant' className='py-8 w-1 bg-black relative top'></div>
        <div id='area' className='py-8 w-1 bg-primary relative below overflow-x-hidden'></div>
        <div id='answer' className='py-8 w-1 bg-black relative top'></div>
        <div id='average' className='py-8 w-1 bg-black relative top invisible'></div>
      </div>
      <div>
        <span className='text-white float-left'>{lower}</span>
        <span className='text-white float-right'>{upper}</span>
      </div>
    </div>
  );
};

export default ResultsSlider;
