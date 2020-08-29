import React, { useRef } from 'react';
import './App.css';

function NumberInput(props) {
  return (
    <button disabled={props.disabled} class="btn" onClick={() => props.onClick()}>{props.value}</button>
  );
}

function PlayerControls(props) {
  return (
    <div id="playerControls">
      <button class="playerButton" disabled={props.playerButtonsDisabled} onClick={() => props.onReplay()}>&#129300;</button>
      <button class="playerButton" disabled={props.playerButtonsDisabled} onClick={() => props.onSlowReplay()}>&#128034;</button>
    </div>
  );
}

class Guess extends React.Component {
  correctPart() {
    let currentGuess = this.props.currentGuess.toString();
    let answer = this.props.answer.toString();

    let maxPossibleCorrectPart = Math.min(currentGuess.length, answer.length);

    let part = "";
    for (var i = 0; i < maxPossibleCorrectPart; ++i) {
      if (currentGuess.charAt(i) == answer.charAt(i)) {
        part += currentGuess.charAt(i);
      }
      else {
        break;
      }
    }

    return part;
  }

  correctPartClass() {
    let currentGuess = this.props.currentGuess.toString();
    let answer = this.props.answer.toString();

    return (currentGuess != "" && answer != "" && currentGuess == answer) ? "guessCorrectComplete" : "guessCorrectIncomplete";
  }

  incorrectPart() {
    let currentGuess = this.props.currentGuess.toString();
    let answer = this.props.answer.toString();

    if (currentGuess == "" || answer == "") {
      return "";
    }
    else if (answer.startsWith(currentGuess)) {
      return "";
    }
    else {
      let part = "";
      let reachedIncorrectPart = false;
      for (var i = 0; i < answer.length; ++i) {
        if (!reachedIncorrectPart && currentGuess.charAt(i) == answer.charAt(i)) {
          continue;
        }
        else {
          reachedIncorrectPart = true;
          part += answer.charAt(i);
        }
      }

      return part;
    }
  }

  render() {
    return (
      <div id="guessArea">
        <span class={this.correctPartClass()}>{this.correctPart()}</span>
        <span id="guessIncorrect">{this.incorrectPart()}</span>
      </div>
    );
  }
}

class NumberInputs extends React.Component {
  renderInput(i) {
    return (
      <NumberInput disabled={this.props.disabled} value={i} onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
    return (
      <div id="numbers">
        <div class="numberRow">
          {this.renderInput(1)}
          {this.renderInput(2)}
          {this.renderInput(3)}
        </div>
        <div class="numberRow">
          {this.renderInput(4)}
          {this.renderInput(5)}
          {this.renderInput(6)}
        </div>
        <div class="numberRow">
          {this.renderInput(7)}
          {this.renderInput(8)}
          {this.renderInput(9)}
        </div>
        <div class="numberRow">
          {this.renderInput(0)}
        </div>
      </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currrentGuess: "",
      answer: ""
    }
  }

  componentDidMount() {
    this.nextQuestion();
  }

  nextQuestion() {
    var answer = Math.floor(Math.random() * 510);
    this.setState({
      answer: answer,
      currrentGuess: "",
      disabled: false,
    });
    this.playAudio("/audio/" + answer + ".mp3");
  }

  checkGuess(guess) {
    let correct = this.state.answer.toString();
    if (guess == correct) {
      this.playAudio("/audio/correct.mp3");
      setTimeout(function() { this.nextQuestion() }.bind(this), 2000);
    }
    else if (correct.startsWith(guess)) {
      this.playAudio("/audio/press.mp3");
      this.setState({
        disabled: false
      })
    }
    else {
      this.playAudio("/audio/incorrect.mp3");
      setTimeout(function() { this.nextQuestion() }.bind(this), 2000);
    }
  }

  playAudio(s, speed) {
    this.setState({
      disabled: true
    })
    let a = new Audio(s);
    if (speed)
      a.playbackRate = speed;
    a.play();
    a.addEventListener("ended", () => this.setState({
      disabled: false
    }));
  }

  playAnswer(slow) {
    let rate = slow ? 0.7 : 1;
    this.playAudio("/audio/" + this.state.answer + ".mp3", rate);
  }

  handleNumberInput(i) {
    let guess = this.state.currrentGuess + i;
    this.setState({
      currrentGuess: guess,
      disabled: true
    });
    this.checkGuess(guess);
  }

  render() {
    return (
      <div>
        <PlayerControls playerButtonsDisabled={this.state.disabled} onReplay={() => this.playAnswer(false)} onSlowReplay={() => this.playAnswer(true)} />
        <Guess currentGuess={this.state.currrentGuess} answer={this.state.answer} />
        <NumberInputs disabled={this.state.disabled} onClick={i => this.handleNumberInput(i)} />
      </div>
    );
  }
}

export default App;
