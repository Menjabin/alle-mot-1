import spinner from '../assets/spinner.svg';

import { getAnswers, getContestantAnswer, getActiveQuestion } from '../utils/fetching';
import { ResultsSlider } from '../components/resultsSlider';
import { useQuery } from '@tanstack/react-query';

export const Results = () => {
  const answersQuery = useQuery({ queryKey: ['all-answers'], queryFn: getAnswers });
  const contestantQuery = useQuery({ queryKey: ['contestant-answer'], queryFn: getContestantAnswer });
  const activeQuery = useQuery({ queryKey: ['active-question'], queryFn: getActiveQuestion });

  if (answersQuery.isLoading || contestantQuery.isLoading || activeQuery.isLoading)
    return <img src={spinner} alt='Loading' />;

  return (
    <ResultsSlider answers={answersQuery.data} contestant={contestantQuery.data} active={activeQuery.data} />
  );
};
