import { useState } from "react";

import { QuestionRow } from '../components/questionRow';
import Button from '../components/button';

/**
 * Presents all questions, with the option to change any aspect of them.
 */
export const QuestionList = ({ active, questions, changeActive }) => {
  const [tempQuestions, setTempQuestions] = useState([]);

  const addTempQuestion = () => {
    const newTempQuestion = { question: "", answer: "" };
    setTempQuestions([...tempQuestions, newTempQuestion]);
  }

  return (
    <div className='w-4/5 mt-10 mx-auto'>
      <p><b>Spørsmålsoversikt</b></p>

      <table className='w-full table-auto'>
        <thead>
          <tr>
            <th className='border-r p-2'>Gjør aktiv</th>
            <th className='border-r p-2'>Nummer</th>
            <th className='border-r p-2'>Spørsmål</th>
            <th className='border-r p-2'>Svar</th>
            <th className='p-2'>Oppdater spørsmål</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <QuestionRow
              key={question.id}
              question={question}
              changeActive={changeActive}
              active={active}
              questions={questions}
            />
          ))}
          {tempQuestions.map((question) => (
            <QuestionRow
              key={question.id}
              question={question}
              changeActive={changeActive}
              active={active}
              questions={questions}
            />
          ))}
        </tbody>
      </table>

      <Button onClick={addTempQuestion}>Legg til spørsmål</Button>
    </div>
  );
};
