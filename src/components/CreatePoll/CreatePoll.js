import React, {useState, useEffect} from 'react';
import './CreatePoll.css';

import axios from 'axios';

const CreatePoll = () => {
    const [questionInput, setQuestionInput] = useState('');
    const [selectionInput, setSelectionInput] = useState(['','','','']);
    const [correctInput, setCorrectInput] = useState(null);

    const handleSubmit = (e) => {
        console.log('submitted');
        e.preventDefault();
        console.log(questionInput, selectionInput, correctInput);
    };

    const handleChange = (e) => {
        switch(e.target.name) {
            case 'question':
                setQuestionInput(e.target.value)
                break;
            case 'selection0':
                setSelectionInput(e.target.value)
                break;
            case 'selection1':
                break;
            case 'selection2':
                break;
            case 'selection3':
                break;
            case 'answer':
                setCorrectInput(e.target.value)
                break;
        }
    };

    return (
        <form className='poll-input' onSubmit={handleSubmit}>
            <label className='form-label'>
                Question:
                <input name='question' type="text" value={questionInput} onChange={handleChange} />
            </label>
            <label className='form-label'>
                Answer 1:
                <input name='selection0' type="text" value={selectionInput[0]} onChange={handleChange} />
            </label>
            <label className='form-label'>
                Answer 2:
                <input name='selection1' type="text" value={selectionInput[1]} onChange={handleChange} />
            </label>
            <label className='form-label'>
                Answer 3:
                <input name='selection2' type="text" value={selectionInput[2]} onChange={handleChange} />
            </label>
            <label className='form-label'>
                Answer 4:
                <input name='selection3' type="text" value={selectionInput[3]} onChange={handleChange} />
            </label>
            <label className='form-label'>
                Correct Answer:
                <input name='answer' type="number" value={correctInput} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
      </form>
    );
};

export default CreatePoll;