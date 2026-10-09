import spinner from "../assets/spinner.svg";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  getActiveQuestion,
  setActiveQuestion,
  deleteAnswers,
  getQuestions,
  getActive,
  deactivate,
} from "../utils/fetching";
import { QuestionList } from "../components/questionList";
import Button from "../components/button";

/**
 * The admin page. Contains dangerous functionality.
 * TODO: password protection
 */
export const Admin = () => {
  const queryClient = useQueryClient();

  const activeQuery = useQuery({
    queryKey: ["active-question"],
    queryFn: () => getActiveQuestion(),
  });

  const setActive = useMutation({
    mutationFn: setActiveQuestion,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["active-question"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["active-game"],
        }),
      ]),
  });

  const activeGameQuery = useQuery({
    queryKey: ["active-game"],
    queryFn: () => getActive(),
  });

  const deactivateMutation = useMutation({
    mutationFn: deactivate,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["active-game"] }),
  });

  const questionsQuery = useQuery({
    queryKey: ["all-questions"],
    queryFn: () => getQuestions(),
  });

  const changeActive = (id, questions) => {
    if (
      !window.confirm(
        "Er du sikker på at du vil endre aktivt spørsmål? Alle eksisterende svar vil bli slettet.",
      )
    )
      return;

    deleteAnswers();
    setActive.mutate(questions.find((question) => question.id === id));
  };

  if (
    activeQuery.isLoading ||
    questionsQuery.isLoading ||
    activeGameQuery.isLoading
  )
    return <img src={spinner} alt="Loading" />;

  return (
    <div className="App min-h-dvh flex flex-col items-center bg-current text-white">
      {!activeGameQuery.data.value ? (
        <p className="mt-5">Innsending av svar er stengt</p>
      ) : (
        <Button onClick={() => deactivateMutation.mutate()}>
          Steng for svar
        </Button>
      )}
      <QuestionList
        active={activeQuery.data}
        questions={questionsQuery.data}
        changeActive={changeActive}
      />
    </div>
  );
};
