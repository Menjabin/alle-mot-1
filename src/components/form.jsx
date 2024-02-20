import '../index.css';

import { useState } from 'react';
import Slider from './slider';

const submit = () => {
    alert('Submitted!');
}

/**
 * Main page content. 
 */
const Form = () => {
    const [value, setValue] = useState(51);

    return (
        <div className='w-4/5'>
            <Slider value={value} setValue={setValue} />
            <button onClick={submit} className='mt-5 bg-primary p-3 shadow-xl hover:bg-white'>
                Send inn svar
            </button>
        </div>
    );
}

export default Form;
