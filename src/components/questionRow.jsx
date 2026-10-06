import { useState } from 'react';
import Button from '../components/button';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateQuestion } from '../utils/fetching';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const QuestionRow = ({
  question,
  changeActive,
  active,
  questions,
}) => {
  const [questionText, setQuestionText] = useState(question.question);
  const [answerText, setAnswerText] = useState(question.answer);
  const [lowerText, setLowerText] = useState(question.lower);
  const [upperText, setUpperText] = useState(question.upper);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: question.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-questions'],
      });
    },
  });

  const submit = (e) => {
    e.preventDefault();

    mutation.mutate({
      id: question.id,
      question: questionText,
      answer: answerText,
      lower: lowerText,
      upper: upperText,
    });
  };

  const hasChanges =
    questionText !== question.question ||
    answerText !== question.answer ||
    lowerText !== question.lower ||
    upperText !== question.upper;

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-t"
      {...attributes}
    >
      <td className="border-r">
        {question.id !== active.id && (
          <Button
            onClick={() =>
              changeActive(question.id, questions)
            }
          >
            Gjør aktiv
          </Button>
        )}
      </td>

      <td className="border-r p-2">
        {question.sort}{' '}
        {question.id === active.id && '(aktiv)'}
      </td>

      <td className="border-r p-1">
        <input
          form={`form${question.id}`}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full p-2 text-secondary"
        />
      </td>

      <td className="border-r p-1">
        <input
          form={`form${question.id}`}
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          className="w-full p-2 text-secondary"
        />
      </td>

      <td className="border-r p-1">
        <input
          form={`form${question.id}`}
          value={lowerText}
          onChange={(e) => setLowerText(e.target.value)}
          className="w-full p-2 text-secondary"
        />
      </td>

      <td className="border-r p-1">
        <input
          form={`form${question.id}`}
          value={upperText}
          onChange={(e) => setUpperText(e.target.value)}
          className="w-full p-2 text-secondary"
        />
      </td>

      <td className="border-r p-1">
        {hasChanges && (
          <Button onClick={submit}>
            Lagre
          </Button>
        )}
      </td>

      <td className="w-10 text-center">
        <button
          type="button"
          {...listeners}
          className="cursor-grab touch-none p-2 text-lg active:cursor-grabbing"
          title="Dra for å flytte"
        >
          ⠿
        </button>
      </td>
    </tr>
  );
};
