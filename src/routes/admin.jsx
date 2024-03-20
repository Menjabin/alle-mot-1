import Button from "../components/button";

import { db } from "../utils/firebase";
import deleteCollection from "../utils/deleteCollection";
import updateActive from "../utils/updateActive";
import useActive from "../hooks/useActive";
import useQuestions from "../hooks/useQuestions";
import { useState } from "react";

const Admin = () => {
  const [activeId, setActiveId] = useState(null);
  const active = useActive(activeId);
  const questions = useQuestions();

  const clearAnswers = () => {
    // Delete all answers from the database.
    deleteCollection(db, "answers", 10);
  };

  const changeActive = (id) => {
    if (!window.confirm("Er du sikker på at du vil endre aktivt spørsmål? Alle eksisterende svar vil bli slettet."))
      return;

    clearAnswers();
    updateActive(id);
    setActiveId(id);
  }

  return (
    <div className="App">
      <div className="App-header bg-current text-white">
        <div className="grid grid-cols-[20%_80%] gap-4 w-full h-full">
          <div>
            <p>Her kommer litt mer brukbar funksjonalitet i fremtiden...</p>
            <Button onClick={clearAnswers}>Slett alle svar</Button>
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
