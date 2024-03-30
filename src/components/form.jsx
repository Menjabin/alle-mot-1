import spinner from '../assets/spinner.svg';

import { useEffect, useState } from 'react';
import Slider from './slider';

import { useQuery } from '@tanstack/react-query';
import { getActiveQuestion, setAnswer, setContestantAnswer } from '../utils/fetching';
import { average } from '../utils/math';

/**
 * Form for submitting answers.
 * The form component is responsible for fetching the current question and submitting the answer.
 */
const Form = ({ id, contestant }) => {
  const [value, setValue] = useState(0);

  const query = useQuery({
    queryKey: ['active-question'],
    queryFn: () => getActiveQuestion(),
    refetchInterval: 10000,
    onSuccess: (data) => {
      const avg = average(data.lower, data.upper);
      setValue(avg);
    },
  });

  useEffect(() => {
    if (query.isSuccess) {
      const avg = average(query.data.lower, query.data.upper);
      setValue(avg);
    }
  }, [query.data, query.isSuccess]);

  const handleSubmit = () => {
    if (contestant)
      setContestantAnswer(value);
    else
      setAnswer(id, value);
  };

  if (query.isLoading)
    return <img src={spinner} alt='Loading' />;
  
  if (query.data.active === false && !contestant)
    return <p className='text-white'>Innsending av svar er stengt</p>

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
