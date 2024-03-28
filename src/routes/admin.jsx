import spinner from '../assets/spinner.svg';

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getActiveQuestion, setActiveQuestion, deleteAnswers, getQuestions } from "../utils/fetching";
import QuestionList from '../components/questionList';

/**
 * The admin page. Contains dangerous functionality.
 * TODO: password protection
 */
const Admin = () => {
  const queryClient = useQueryClient();
  const activeQuery = useQuery({ queryKey: ['active-question'], queryFn: () => getActiveQuestion()});
  const mutation = useMutation({
    mutationFn: setActiveQuestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['active-question'] }),
  });

  const questionsQuery = useQuery({ queryKey: ['all-questions'], queryFn: () => getQuestions()});

  const changeActive = (id, questions) => {
    if (!window.confirm("Er du sikker på at du vil endre aktivt spørsmål? Alle eksisterende svar vil bli slettet."))
      return;

    deleteAnswers();
    mutation.mutate(questions.find((question) => question.id === id));
  }

  if (activeQuery.isLoading || questionsQuery.isLoading)
    return <img src={spinner} alt='Loading' />;

  return (
    <div className="App">
      <div className="App-header bg-current text-white">
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
