import spinner from '../assets/spinner.svg';
import Button from "../components/button";

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getActiveQuestion, setActiveQuestion, deleteAnswers, getQuestions } from "../utils/fetching";

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

  const changeActive = (id) => {
    if (!window.confirm("Er du sikker på at du vil endre aktivt spørsmål? Alle eksisterende svar vil bli slettet."))
      return;

    deleteAnswers();
    mutation.mutate(questions.find((question) => question.id === id));
  }

  if (activeQuery.isLoading || questionsQuery.isLoading)
    return <img src={spinner} alt='Loading' />;

  const active = activeQuery.data;
  const questions = questionsQuery.data;

  return (
    <div className="App">
      <div className="App-header bg-current text-white">
        <div className="grid grid-cols-[20%_80%] gap-4 w-full h-full">
          <div>
            <p>Her kommer litt mer brukbar funksjonalitet i fremtiden...</p>
            <Button onClick={deleteAnswers}>Slett alle svar</Button>
          </div>
          <div className="mx-auto">
            <p><b>Spørsmålsoversikt</b></p>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="border-r p-4">Gjør aktiv</th>
                  <th className="border-r p-4">Nummer</th>
                  <th className="border-r p-4">Spørsmål</th>
                  <th className="p-4">Svar</th>
                </tr>
              </thead>
              <tbody>
                {questions &&
                  questions.map((question) => (
                    <tr key={question.id} className="border-t">
                      <td className="border-r p-4">{question.id != active.id ? <Button onClick={() => changeActive(question.id)}>Gjør aktiv</Button> : <></>}</td>
                      <td className="border-r p-4">{question.id} {question.id == active.id ? '(aktiv)' : <></>}</td>
                      <td className="border-r p-4">{question.question}</td>
                      <td className="p-4">{question.answer}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
