import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import './styles/Board.css';
import Selection from './Selection'
import { ANSWER_COLORS } from '../constants/theme';
import { API_BASE_URL } from '../constants/urls';



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
        // Call API for current poll
        axios.get(API_BASE_URL + '/getPoll')
        .then((response) => {
            setPoll(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        // Subscribe to API SSE for new polls
        let eventSource = new EventSource(API_BASE_URL + `/pollStream?id=${Math.floor(Math.random() * Math.floor(255))}`)
        eventSource.onmessage = (e) => {
            console.log('SSE received');
            setPoll(JSON.parse(e.data));
        }
        eventSource.onerror = (err) => {
            console.log("EventSource failed: ", err);
        }
      }, [])

    
    useEffect(() => {
        // If poll has changed, reset our submission status
        setSubmit({submitted: false, correct: false});
    }, [poll])

    const handleClick = (id) => {
        // Only allow one submission
        if (!submit.submitted) {
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
                <div>
                    <button className='home-select'> 
                        <Link className='router-link' to="/">Home</Link>
                    </button>
                </div>
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