import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {
  @Input() index!: number;
  @Output() squareClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.squareClicked.emit(this.index);
  }
}
