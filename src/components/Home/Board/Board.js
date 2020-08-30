import React, {useState, useEffect} from 'react';
import './Board.css';
import Selection from './Selection/Selection'
import { ANSWER_COLORS } from '../../../constants/theme';
import { API_BASE_URL } from '../../../constants/urls';

import axios from 'axios';


const Board = () => {

    // Stores the poll data
    const [poll, setPoll] = useState({
        question: null,
        selections: null,
        answer: null
    });

    // Tracks submission status
    const[submit, setSubmit] = useState({submitted: false, correct: false});

    useEffect(() => {
        // Call API for new poll
        axios.get(API_BASE_URL + '/getPoll')
        .then((response) => {
            setPoll(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const handleClick = (id) => {
        // Only allow one submission
        if (!submit.submitted) {

            console.log({
                selected: id,
                correct: poll.selections[id] == poll.answer
            });
    
            // POST answer to API
            axios.post(API_BASE_URL + '/submitAnswer', {
                answer: id
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
            
            // Update submission state
            setSubmit({submitted: true, correct: poll.selections[id] == poll.answer})
        }
    }

    const BlankMessage = () => {
        return (
            <div className='board-message'>
                Waiting for poll...
            </div>
        )
    }

    const SubmissionText = () => {
        return (
            <div className='board-message'>
                Answer submitted <br/>
                {submit.correct ? 'Correct' : 'Incorrect'}!
            </div>
        )
    }

    const renderSelection = (id) => {
        return (
            <Selection
                id={id}
                selection={poll.selections ? poll.selections[id] : ''}
                onClick={() => {handleClick(id)}}
                color={ANSWER_COLORS[id]}> 
            </Selection>
        )
    }

    const BoardSelections = () => {
        return(
            <div>
                <h2 className = "question">
                    {poll.question}
                </h2>
                <div className = "answers">
                    {renderSelection(0)}
                    {renderSelection(1)}
                    {renderSelection(2)}
                    {renderSelection(3)}
                </div>
            </div>
        )
    }
    
    // Conditional renders
    if (submit.submitted) {
        return SubmissionText()
    } else if (poll.question) {
        return BoardSelections()
    } else {
        return BlankMessage()
    }
      
};

export default Board;