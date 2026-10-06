import { useState } from 'react';
import Button from '../components/button';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateQuestion } from '../utils/fetching';

export const QuestionRow = ({ question, changeActive, active, questions }) => {
  const [questionText, setQuestionText] = useState(question.question);
  const [answerText, setAnswerText] = useState(question.answer);
  const [lowerText, setLowerText] = useState(question.lower);
  const [upperText, setUpperText] = useState(question.upper);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateQuestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-questions'] }),
  });

  const submit = e => {
    e.preventDefault();
    mutation.mutate({ id: question.id, question: questionText, answer: answerText, lower: lowerText, upper: upperText });
  }

  return (
    <tr className='border-t'>
      <td className='border-r'>{question.id !== active.id ? <Button onClick={() => changeActive(question.id, questions)}>Gjør aktiv</Button> : <></>}</td>
      <td className='border-r'>{question.sort} {question.id === active.id ? '(aktiv)' : <></>}</td>
      <td className='border-r'>
        <input
          form={`form${question.id}`}
          value={questionText}
          onChange={e => setQuestionText(e.target.value)}
          className='w-full p-2 text-secondary'
        />
      </td>
      <td className='border-r'>
        <input 
          form={`form${question.id}`}
          value={answerText}
          onChange={e => setAnswerText(e.target.value)}
          className='w-full p-2 text-secondary'
        />
      </td>
      <td className='border-r'>
        <input 
          form={`form${question.id}`}
          value={lowerText}
          onChange={e => setLowerText(e.target.value)}
          className='w-full p-2 text-secondary'
        />
      </td>
      <td className='border-r'>
        <input 
          form={`form${question.id}`}
          value={upperText}
          onChange={e => setUpperText(e.target.value)}
          className='w-full p-2 text-secondary'
        />
      </td>
      <td className='p-1'>
        {questionText === question.question
         && answerText === question.answer
         && lowerText === question.lower
         && upperText === question.upper
          ? <></>
          : <Button onClick={submit}>Lagre</Button>
        }
      </td>
    </tr>
  );
};
