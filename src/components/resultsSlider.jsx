import { useEffect, useState } from 'react';

/**
 * Slider which shows the contestant result,
 * the actual result, and the average result
 * when the space bar is pressed.
 */
export const ResultsSlider = ({ answers, contestant, active }) => {
  const answerSum = answers.reduce(
    (sum, answer) => sum + answer.value,
    0
  );

  const averageAnswer = Math.round(
    answerSum / answers.length
  );

  const contestantAnswer = contestant.value;

  const lower = active.lower;
  const upper = active.upper;

  const contestantOffset = position(
    contestantAnswer,
    lower,
    upper
  );

  const answerOffset = position(
    active.answer,
    lower,
    upper
  );

  const averageOffset = position(
    averageAnswer,
    lower,
    upper
  );

  const [showAverage, setShowAverage] = useState(false);
  const [animatedAverage, setAnimatedAverage] = useState(
    0
  );

  useEffect(() => {
    const handleKeyUp = async (e) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();

        setShowAverage(true);

        for (
          let pos = 0;
          pos <= averageOffset;
          pos += 0.1
        ) {
          setAnimatedAverage(pos);

          await new Promise((resolve) =>
            setTimeout(resolve, 5)
          );
        }
      }
    };

    document.body.addEventListener(
      'keyup',
      handleKeyUp
    );

    return () => {
      document.body.removeEventListener(
        'keyup',
        handleKeyUp
      );
    };
  }, [averageOffset]);

  // Area between contestant and actual answer
  const distance = Math.abs(
    answerOffset - contestantOffset
  );

  const areaLeft = Math.max(
    0,
    answerOffset - distance
  );

  const areaRight = Math.min(
    100,
    answerOffset + distance
  );

  const areaWidth = areaRight - areaLeft;

  return (
    <div className="w-10/12 mx-auto">
      {/* Answer values */}
      <div
        className="w-full relative"
        style={{ height: '32px' }}
      >
        {/* Contestant answer */}
        <span
          className="text-white absolute"
          style={{
            left: `${contestantOffset}%`,
            top: '-8px',
            transform: 'translateX(-50%)',
          }}
        >
          {contestantAnswer}
        </span>

        {/* Actual answer */}
        <span
          className="text-white absolute"
          style={{
            left: `${answerOffset}%`,
            top: '-8px',
            transform: 'translateX(-50%)',
          }}
        >
          {active.answer}
        </span>

        {/* Average answer */}
        {showAverage && (
          <span
            className="text-white absolute"
            style={{
              left: `${animatedAverage}%`,
              top: '-8px',
              transform: 'translateX(-50%)',
            }}
          >
            {Math.round(
              (animatedAverage / 100) *
                (upper - lower) +
                lower
            )}
          </span>
        )}
      </div>

      {/* Slider */}
      <div
        id="container"
        className="w-full bg-white relative"
        style={{ height: '64px' }}
      >
        {/* Contestant */}
        <div
          id="contestant"
          className="w-1 bg-black absolute top-0 h-full"
          style={{
            left: `${contestantOffset}%`,
            transform: 'translateX(-50%)',
          }}
        />

        {/* Area between contestant and actual answer */}
        <div
          id="area"
          className="bg-primary absolute top-0 h-full"
          style={{
            left: `${areaLeft}%`,
            width: `${areaWidth}%`,
          }}
        />

        {/* Actual answer */}
        <div
          id="answer"
          className="w-1 bg-black absolute top-0 h-full"
          style={{
            left: `${answerOffset}%`,
            transform: 'translateX(-50%)',
          }}
        />

        {/* Average */}
        {showAverage && (
          <div
            id="average"
            className="w-1 bg-black absolute top-0 h-full"
            style={{
              left: `${animatedAverage}%`,
              transform: 'translateX(-50%)',
            }}
          />
        )}
      </div>

      {/* Slider bounds */}
      <div>
        <span className="text-white float-left">
          {lower}
        </span>

        <span className="text-white float-right">
          {upper}
        </span>
      </div>
    </div>
  );
};

const position = (value, lower, upper) => {
  if (upper === lower) {
    return 0;
  }

  return ((value - lower) / (upper - lower)) * 100;
};