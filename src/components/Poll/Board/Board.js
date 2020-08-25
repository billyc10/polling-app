import React, {useState, useEffect} from 'react';
import './Board.css';
import Selection from './Selection/Selection'
import { ANSWER_COLORS } from '../../../constants/theme';
import { API_BASE_URL } from '../../../constants/urls';

import axios from 'axios';


const Board = (props) => {

    const[poll, setPoll] = useState({
        question: null,
        selections: null,
        answer: null
    });

    useEffect(() => {
        axios.get(API_BASE_URL + '/getPoll')
        .then((response) => {
            setPoll(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])


    const handleClick = (id) => {
        console.log('Selected ' + id);
        console.log(id == poll.answer);

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

        props.updateSubmit({submitted: true, correct: id == poll.answer})
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

export default Board;