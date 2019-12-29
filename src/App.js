import React from 'react';
import './App.css';
import './bootstrap.min.css';
import './constants/theme';
import { ANSWER_COLORS } from './constants/theme';

function Selection(props) {
    return (
      <button 
        id={props.id}
        className="selection"
        onClick= {null}
        style=
        {
          {
            backgroundColor: props.color,
            border: "solid black"
          }
        }
      >
      </button>
    );
}

function Options(props) {
  return (
    <Selection id={props.id} color={props.color}> </Selection>
  )
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isQuestion: false,
      question: "Wait for question",
      answer: null
    }
  }

  /*
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

  */

  render() {
    return (
      <div>
        <h2 className = "question">
          {this.state.question}
        </h2>
        <div className = "answers">
          <Options id={1} color={ANSWER_COLORS[0]}> </Options>
          <Options id={2} color={ANSWER_COLORS[1]}> </Options>
          <Options id={3} color={ANSWER_COLORS[2]}> </Options>
          <Options id={4} color={ANSWER_COLORS[3]}> </Options>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
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


export default Game;