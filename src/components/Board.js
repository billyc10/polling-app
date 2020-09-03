import React, {useState, useEffect, useRef} from 'react';
import {Link} from "react-router-dom";

import './styles/Board.css';
import Selection from './Selection'
import { ANSWER_COLORS } from '../constants/theme';
import { API_BASE_URL } from '../constants/urls';

import axios from 'axios';


const Board = () => {

    // Stores the poll data
    const [poll, _setPoll] = useState({
        question: null,
        selections: null,
        answer: null
    });

    // useRef is used so SSE event listener 'onmessage' can access the poll state
    // the event listener is only created once during initial render
    const pollContainer = useRef(poll);

    const setPoll = (x) => {
        _setPoll(x);
        pollContainer.current = x;
    }

    // Tracks submission status
    const[submit, setSubmit] = useState({submitted: false, correct: false});

    useEffect(() => {
        // Subscribe to API server-sent event for new polls
        let eventSource = new EventSource(API_BASE_URL + `/pollStream/${Math.floor(Math.random() * Math.floor(255))}`)
        
        eventSource.onmessage = (e) => {
            // only update poll state if incoming poll data is different
            if (e.data !== JSON.stringify(pollContainer.current)){
                setPoll(JSON.parse(e.data));
                setSubmit({submitted: false, correct: false});
            }
        }
        eventSource.onerror = (err) => {
            console.log("EventSource failed: ", err);
        }
      }, [])

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