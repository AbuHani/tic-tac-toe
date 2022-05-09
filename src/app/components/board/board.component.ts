import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';

type Players = {
  playerX: Player;
  playerO: Player;
};

type Player = {
  turn: string;
  name: string;
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  gameStarted = false;
  gameFinished = false;
  winner = false;
  players!: Players;
  playersForm!: FormGroup;
  rows: string[][] = [];
  squares: string[] = [];
  currentPlayer!: Player;

  constructor(private gameService: GameService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.playersForm = this.fb.group({
      playerX: this.fb.group({
        turn: ['X'],
        name: ['', [Validators.required]],
      }),
      playerO: this.fb.group({
        turn: ['O'],
        name: ['', [Validators.required]],
      }),
    });
  }

  startGame() {
    if (!this.playersForm.valid) return;

    this.players = this.playersForm.value;
    this.winner = false;
    this.gameFinished = false;
    this.gameStarted = true;
    this.currentPlayer = this.players.playerX;
    this.generateSquares();
  }

  resetGame() {
    // To reset players names and game
    // this.gameStarted = false;
    // this.resetPlayersName();
    this.startGame();
  }

  resetPlayersName() {
    this.playersForm.get('playerX.name')?.reset();
    this.playersForm.get('playerO.name')?.reset();
  }

  generateSquares() {
    const squares = Array.from<string>({ length: 9 }).map((v) => v);

    this.squares = squares;
  }

  onSquareClicked(index: number) {
    if (this.gameFinished || this.winner || this.squares[index]) return;

    this.squares[index] = this.currentPlayer.turn;

    const isFull = this.squares.filter((square) => !square).length === 0;
    const winner = this.gameService.calculateWinner(this.squares);

    if (!!winner || isFull) {
      this.winner = !!winner;
      this.gameFinished = !!isFull;
      return;
    }

    if (this.currentPlayer.turn === 'X') {
      this.currentPlayer = this.players.playerO;
    } else {
      this.currentPlayer = this.players.playerX;
    }
  }
}
