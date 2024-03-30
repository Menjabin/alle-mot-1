import spinner from '../assets/spinner.svg';

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getActiveQuestion, setActiveQuestion, deleteAnswers, getQuestions, deactivateQuestion } from "../utils/fetching";
import QuestionList from '../components/questionList';
import Button from '../components/button';

/**
 * The admin page. Contains dangerous functionality.
 * TODO: password protection
 */
const Admin = () => {
  const queryClient = useQueryClient();
  const activeQuery = useQuery({ queryKey: ['active-question'], queryFn: () => getActiveQuestion()});
  const setActive = useMutation({
    mutationFn: setActiveQuestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['active-question'] }),
  });
  const disableActive = useMutation({
    mutationFn: deactivateQuestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['active-question'] }),
  });

  const questionsQuery = useQuery({ queryKey: ['all-questions'], queryFn: () => getQuestions()});

  const changeActive = (id, questions) => {
    if (!window.confirm("Er du sikker på at du vil endre aktivt spørsmål? Alle eksisterende svar vil bli slettet."))
      return;

    deleteAnswers();
    setActive.mutate(questions.find((question) => question.id === id));
  }

  if (activeQuery.isLoading || questionsQuery.isLoading)
    return <img src={spinner} alt='Loading' />;

  return (
    <div className="App">
      <div className="App-header bg-current text-white">
        <Button onClick={() => disableActive.mutate()}>Steng for svar</Button>
        <QuestionList
          active={activeQuery.data}
          questions={questionsQuery.data}
          changeActive={changeActive}
        />
      </div>
    </div>
  );
};

export default Admin;
