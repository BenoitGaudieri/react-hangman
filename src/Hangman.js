import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import { randomWord } from './words.js';

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [ img0, img1, img2, img3, img4, img5, img6 ]
	};

	constructor(props) {
		super(props);
		this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
		this.handleGuess = this.handleGuess.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return this.state.answer.split('').map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'));
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(evt) {
		let ltr = evt.target.value;
		this.setState((st) => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
		}));
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
			<button key={ltr} value={ltr} onClick={this.handleGuess} disabled={this.state.guessed.has(ltr)}>
				{ltr}
			</button>
		));
	}
	/* handleRestart(): Restart the game resetting the state to their original state. 
You don't need an {(rst) =>} function or to unpack with ...rst because it doesn't depend to anything. */
	handleRestart() {
		this.setState({
			nWrong: 0,
			guessed: new Set(),
			answer: randomWord()
		});
	}

	/** render: render game */
	render() {
		const winState = this.guessedWord().join('') === this.state.answer;
		const gameOver = this.state.nWrong === this.props.maxWrong;
		let gameState = this.generateButtons();
		if (winState) gameState = 'You win!';
		if (gameOver) gameState = `You Lose! The answer was: ${this.state.answer}`;
		/* 		
    let winState = this.state.guessed.map((ltr) => (this.state.answer.includes(ltr) ? true : false));
    */

		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				<img src={this.props.images[this.state.nWrong]} alt={this.state.nWrong} />
				<p>
					Number wrong: {this.state.nWrong}
					<button onClick={this.handleRestart}>🔃</button>
				</p>
				{/* Check if it's not gameover (with !gameOver) and display the word to guess (with _) or the full answer if it is gameOver */}
				<p className="Hangman-word">{!gameOver ? this.guessedWord() : this.state.answer}</p>
				{/* refactoring in gameState with winState and gameOver
 				<p className="Hangman-btns">{this.state.nWrong === 6 ? 'You Lose!' : this.generateButtons()}</p>
        {this.guessedWord().join('') === this.state.answer && <p>YOU WIN!!!</p>}
 */}
				<p className="Hangman-btns">{gameState}</p>
			</div>
		);
	}
}

export default Hangman;
