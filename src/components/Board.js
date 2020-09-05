import React, {useState, useEffect, useRef} from 'react';
import {Link} from "react-router-dom";

import './styles/Board.css';
import './styles/Home.css';
import './styles/CreatePoll.css';

import Selection from './Selection'
import { ANSWER_COLORS } from '../constants/theme';
import { API_BASE_URL } from '../constants/urls';

import axios from 'axios';


const Board = () => {
    /* =========== State variables =========== */
    const [formData, setFormData] = useState(null); // Form to enter room ID
    const [idError, setIdError] = useState(false); // Tracks if entered ID is valid
    const [id, setId] = useState(null); // Room ID

    // useRef is used so SSE event listener 'onmessage' can access the poll state
    // the event listener is only created once during initial render
    const [poll, _setPoll] = useState(null); // Stores the poll data
    const pollContainer = useRef(poll);

    const setPoll = (x) => {
        _setPoll(x);
        pollContainer.current = x;
    }

    // Tracks poll submission status
    const[submit, setSubmit] = useState({submitted: false, correct: false});

    /* =========== API requests =========== */
    useEffect(() => {
        // Subscribe to API server-sent event for new polls
        let eventSource = new EventSource(API_BASE_URL + `/pollStream?id=${id}`)
        
        eventSource.onmessage = (e) => {
            // only update poll state if incoming poll data is different
            console.log(e.data);
            if (e.data !== JSON.stringify(pollContainer.current)){
                setPoll(JSON.parse(e.data));
                setSubmit({submitted: false, correct: false});
            }
        }
        eventSource.onerror = (err) => {
            console.log("EventSource failed: ", err);
        }
      }, [id]);

    /* =========== Handler Functions =========== */
    const handleChange = (e) => {
        // Handles form input for connection to room

        // Must access these values like this due to React Synthetic Event Pooling
        const {name, value} = e.target;
        setFormData(value);
    };

    const handleSubmit = (e) => {
        // Handles form submission for room connection
        e.preventDefault();

        const id = formData;

        // Check if room ID exists with API
        axios.get(API_BASE_URL + `/connectRoom?id=${id}`)
          .then((response) => {
            setIdError(false);
            setId(id);
          })
          .catch((error) => {
            setIdError(true);
          });
    };

    const handleClick = (answerId) => {
        // Handles submission of poll response

        // Only allow one submission
        if (!submit.submitted) {
            // POST answer to API
            axios.post(API_BASE_URL + '/submitAnswer', {
                id: id,
                answer: answerId
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
            
            // Update submission state
            setSubmit({submitted: true, correct: poll.selections[answerId] == poll.answer})
        }
    }

    /* =========== Component Render Sections =========== */
    const ConnectToRoom = () => {
        // Prompt to connect to room via ID
        return (
            <div>
                 <form className='poll-input' onSubmit={handleSubmit}>
                    {idError && 
                        <div style={{color: "red"}}> Invalid ID </div>
                    }
                    <label className='form-label'>
                        Enter room code: 
                        <input name='room-code' type="text" value={formData || ''} onChange={handleChange} />
                    </label>
                    <input className='submit-btn' type="submit" value="Submit" />
                </form>
            </div>
        )
    }

    const WaitingMessage = () => {
        // Connected to a room but awaiting new poll
        return (
            <div className='board-message'>
                Connected to room {id}
                <br></br>
                Waiting for poll...
            </div>
        )
    }

    const SubmissionText = () => {
        // Post-submission of a poll response
        return (
            <div className='board-message'>
                Answer submitted <br/>
                {submit.correct ? 'Correct' : 'Incorrect'}!
            </div>
        )
    }

    const renderSelection = (id) => {
        // Renders one answer option
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
        // Renders poll and answer options
        return(
            <div>
                <div>
                    Connected to room {id}
                </div>
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
    
    /* =========== Conditional Renders =========== */
    if (!id) {
        return ConnectToRoom()
    } else if (submit.submitted) {
        return SubmissionText()
    } else if (poll) {
        return BoardSelections()
    } else {
        return WaitingMessage()
    }
      
};

export default Board;