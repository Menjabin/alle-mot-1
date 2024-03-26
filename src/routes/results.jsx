import spinner from '../assets/spinner.svg';

import { getAnswers, getContestantAnswer, getActiveQuestion } from '../utils/fetching';
import ResultsSlider from '../components/resultsSlider';
import { useQuery } from '@tanstack/react-query';

const Results = () => {
  const answersQuery = useQuery({ queryKey: ['all-answers'], queryFn: getAnswers });
  const contestantQuery = useQuery({ queryKey: ['contestant-answer'], queryFn: getContestantAnswer });
  const activeQuery = useQuery({ queryKey: ['active-question'], queryFn: getActiveQuestion });

  if (answersQuery.isLoading || contestantQuery.isLoading || activeQuery.isLoading)
    return <img src={spinner} alt='Loading' />;

  return (
    <div className='App'>
      <div className='App-header bg-current text-secondary'>
        <ResultsSlider answers={answersQuery.data} contestant={contestantQuery.data} active={activeQuery.data} />
      </div>
    </div>
  );
}

export default Results;
