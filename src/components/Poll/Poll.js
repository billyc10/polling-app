import React from 'react';
import './Poll.css';
import { Board } from '../index';

export default class App extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="title">
                Billy's Cool Poll!
            </div>
            <div className="game-board">
                <Board />
            </div>
        </div>
        );
    }
}