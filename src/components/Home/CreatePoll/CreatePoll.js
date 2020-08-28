import React, {useState, useEffect} from 'react';
import './CreatePoll.css';
import { API_BASE_URL } from '../../constants/urls';

import axios from 'axios';

const CreatePoll = () => {
    // Component is a form that accepts a new poll, and submits it to the API

    // formData will hold question, selections and answer. Undefined by default.
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert state object to API poll object
        const poll = {
            question: formData['question'],
            selections: [
                formData['selection0'],
                formData['selection1'],
                formData['selection2'],
                formData['selection3']
            ],
            answer: formData['answer']
        };

        // Send new poll to API
        axios.post(API_BASE_URL + '/setPoll', poll)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        alert(`Submitting: ${JSON.stringify(poll)}`);
    };

    const handleChange = (e) => {
        // Must access these values like this due to React Synthetic Event Pooling
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Render list of possible answers as <option> elements
    const answerList = [];
    for (let i = 0; i < 4; i++) {
        let selection = formData[`selection${i}`];
        if (selection) { answerList.push(<option key={i} value={selection}> {selection} </option>); }
    }

    // Controlled components, each input field reads and updates from the state
    return (
        <form className='poll-input' onSubmit={handleSubmit}>
            <label className='form-label'>
                Question:
                <input name='question' type="text" value={formData['question'] || ''} onChange={handleChange} />
            </label>
            <label className='form-label'>
                Option 1:
                <input name='selection0' type="text" value={formData['selection0'] || ''} onChange={handleChange} />
            </label>
            <label className='form-label'>
                Option 2:
                <input name='selection1' type="text" value={formData['selection1'] || ''} onChange={handleChange} />
            </label>
            <label className='form-label'>
                Option 3:
                <input name='selection2' type="text" value={formData['selection2'] || ''} onChange={handleChange} />
            </label>
            <label className='form-label'>
                Option 4:
                <input name='selection3' type="text" value={formData['selection3'] || ''} onChange={handleChange} />
            </label>
            <label className='form-label'>
                Correct Answer:
                <select className='form-label' name='answer' value={formData['answer'] || '_default'} onChange={handleChange}>
                    <option value = '_default' disabled> Select Correct Response </option>
                    {answerList}
                </select>
            </label>
            <input className='submit-btn' type="submit" value="Submit" />
      </form>
    );
};

export default CreatePoll;