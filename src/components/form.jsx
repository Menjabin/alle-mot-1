import spinner from '../assets/spinner.svg';

import { useState } from 'react';
import Slider from './slider';

import { useQuery } from '@tanstack/react-query';
import { getActiveQuestion, setAnswer } from '../utils/fetching';

/**
 * Form for submitting answers.
 * The form component is responsible for fetching the current question and submitting the answer.
 */
const Form = ({ id }) => {
  const query = useQuery({ queryKey: ['active-question'], queryFn: () => getActiveQuestion()});

  const [value, setValue] = useState(5);

  const handleSubmit = () => {
    setAnswer(id, value);
  };

  if (query.isLoading)
    return <img src={spinner} alt='Loading' />;

  return query.isSuccess && <SubForm active={query.data} value={value} setValue={setValue} submit={handleSubmit} />;
};

const SubForm = ({ active, value, setValue, submit }) => {
  return (
    <div className='w-4/5'>
      <h1 className='text-3xl font-bold text-white mb-8'>{active.question}</h1>
      <Slider value={value} setValue={setValue} lower={active.lower} upper={active.upper} />
      <button
        onClick={submit}
        className='mt-5 bg-primary p-3 shadow-xl hover:bg-white'
      >
        Send inn svar
      </button>
    </div>
  );
}

export default Form;
