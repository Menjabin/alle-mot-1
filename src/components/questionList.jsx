import QuestionRow from '../components/questionRow';

/**
 * Presents all questions, with the option to change any aspect of them.
 */
const QuestionList = ({ active, questions, changeActive }) => {
  return (
    <div className='mx-auto'>
      <p><b>Spørsmålsoversikt</b></p>

      <table className='table-auto'>
        <thead>
          <tr>
            <th className='border-r p-4'>Gjør aktiv</th>
            <th className='border-r p-4'>Nummer</th>
            <th className='border-r p-4'>Spørsmål</th>
            <th className='border-r p-4'>Svar</th>
            <th className='p-4'>Oppdater spørsmål</th>
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
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
