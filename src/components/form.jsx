import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../utils/firebase';
import Slider from './slider';

const submit = () => {
    alert('Submitted!');
}

/**
 * Main page content. 
 */
const Form = () => {
    const [question, setQuestion] = useState('');
    const [value, setValue] = useState(51);

    const fetchQuestion = async () => {
        const docRef = doc(db, "questions", "1");
        const docSnap = await getDoc(docRef);

        console.log(docSnap.data().question);
        setQuestion(docSnap.data().question);
    }

    useEffect(() => {
        fetchQuestion();
    }, []);

    return (
        <div className='w-4/5'>
            <h1 className='text-3xl font-bold text-white mb-8'>{question}</h1>
            <Slider value={value} setValue={setValue} />
            <button onClick={submit} className='mt-5 bg-primary p-3 shadow-xl hover:bg-white'>
                Send inn svar
            </button>
        </div>
    );
}

export default Form;
