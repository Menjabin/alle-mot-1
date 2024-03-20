import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import Slider from "./slider";

import useQuestion from "../hooks/useQuestion";

/**
 * Main page content.
 */
const Form = ({ id }) => {
  const question = "Hva er 2+2?";
  const [value, setValue] = useState(51);

  const submit = () => {
    const docRef = doc(db, "answers", id);
    setDoc(docRef, { answer: value }, { merge: true });
  };

  return (
    <div className="w-4/5">
      <h1 className="text-3xl font-bold text-white mb-8">{question}</h1>
      <Slider value={value} setValue={setValue} lower={0} upper={100} />
      <button
        onClick={submit}
        className="mt-5 bg-primary p-3 shadow-xl hover:bg-white"
      >
        Send inn svar
      </button>
    </div>
  );
};

export default Form;
