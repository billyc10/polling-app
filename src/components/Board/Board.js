import React, {useState, useEffect} from 'react';
import './Board.css';
import { Selection } from '../index.js'
import { ANSWER_COLORS } from '../../constants/theme';

import axios from 'axios';


const Board = () => {

    const[poll, setPoll] = useState({
        question: null,
        selections: null,
        answer: null
    });

    const[submit, setSubmit] = useState({submitted: false, correct: false})

    useEffect(() => {
        axios.get('http://localhost:25565/getPoll')
        .then((response) => {
            setPoll(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])


    const handleClick = (id) => {
        console.log(':(')
        console.log(id == poll.answer);
        setSubmit({submitted: true, correct: id == poll.answer})
    }
    
  
    const renderSelection = (id) => {
        if (poll.selections == null) {
            return null
        }
        return (
            <Selection
                id={id}
                selection={poll.selections[id]}
                onClick={() => {handleClick(id)}}
                color={ANSWER_COLORS[id]}> 
            </Selection>
        )
    }
  
    return (
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
    );    
};

export default Board