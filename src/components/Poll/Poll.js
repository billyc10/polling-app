import React, {useState} from 'react';
import './Poll.css';
import Board from './Board/Board';

const Poll = () => {

    const[submit, setSubmit] = useState({submitted: false, correct: false});

    return (
        <div className="game">
            <div className="title">
                Billy's Cool Poll!
            </div>
            <div className="game-board">
                <Board 
                    updateSubmit={setSubmit}
                />
            </div>
        </div>
    );
}

export default Poll;