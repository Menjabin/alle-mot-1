import { useState } from 'react';
import Button from '../components/button';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateQuestion } from '../utils/fetching';

const QuestionRow = ({ question, changeActive, active, questions }) => {
  const [questionText, setQuestionText] = useState(question.question);
  const [answerText, setAnswerText] = useState(question.answer);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateQuestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-questions'] }),
  });

  const submit = e => {
    e.preventDefault();
    mutation.mutate({ id: question.id, question: questionText, answer: answerText, lower: question.lower, upper: question.upper });
  }

  return (
    <tr className='border-t'>
      <td className='border-r p-4'>{question.id != active.id ? <Button onClick={() => changeActive(question.id, questions)}>Gjør aktiv</Button> : <></>}</td>
      <td className='border-r p-4'>{question.id} {question.id == active.id ? '(aktiv)' : <></>}</td>
      <td className='border-r p-4'>
        <input
          form={`form${question.id}`}
          value={questionText}
          onChange={e => setQuestionText(e.target.value)}
          className='text-secondary p-2'
        />
      </td>
      <td className='border-r p-4'>
        <input 
          form={`form${question.id}`}
          value={answerText}
          onChange={e => setAnswerText(e.target.value)}
          className='text-secondary p-2'
        />
      </td>
      <td className='p-4'>
        {questionText === question.question && answerText === question.answer ? <></> :
          <Button onClick={submit}>Oppdater</Button>
        }
      </td>
    </tr>
  );
};

export default QuestionRow;
