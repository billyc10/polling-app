import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import { invoke } from 'q';

function Square(props) {
    return (
      <button 
        className="square"
        onClick = {props.onClick}
      >
        {props.value}
      </button>
    );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xNext: true
    }
  }

  checkWin() {
    const winStates = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    
    winStates.forEach(combo => {

      const letter = this.state.squares[combo[0]];

      if (letter == null) {return false}

      combo.forEach(i => {
        if (this.state.squares[i] != letter) {
          return false
        }
      })

      alert(`${combo}`)
      return true;
    })
  }

  handleClick(i) {
    let nextState = this.state.squares.slice();
    if (this.state.xNext) {
      nextState[i] = "X"
    } else {
      nextState[i] = "O"
    }

    this.setState({
      squares: nextState,
      xNext: !this.state.xNext
    })

    this.checkWin();
  }

  renderSquare(i) {
    return <
      Square value={this.state.squares[i]}
      onClick = {() => this.handleClick(i)}
    />;
  }

  render() {
    const status = 'Next player: ' + (this.state.xNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


export default Game;