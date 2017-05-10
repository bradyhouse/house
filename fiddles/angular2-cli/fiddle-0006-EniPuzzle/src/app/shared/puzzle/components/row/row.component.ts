import {Component, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {SquareOptionsInterface} from '../index';
import {DatabaseServiceInterface, StateServiceInterface} from '../../index';
import {BaseComponent} from '../base.component';
import {RowInterface} from './row.interface';
import {RowOptionsInterface} from './row-options.interface';
import {Utils} from '../../index';


@Component({
  moduleId: module.id,
  selector: 'pz-row',
  templateUrl: 'row.component.html',
  styleUrls: [
    'row.component.css',
  ],
})
export class RowComponent extends BaseComponent implements RowInterface, OnChanges {

  @Input() options: RowOptionsInterface;
  @Output() squareClick: EventEmitter<[RowComponent, SquareOptionsInterface]>;
  @Output() leftClick: EventEmitter<RowComponent>;
  @Output() rightClick: EventEmitter<RowComponent>;

  squares: SquareOptionsInterface[];

  get emptySquare(): SquareOptionsInterface {
    let emptySquares: SquareOptionsInterface[] = this.squares.filter((square: SquareOptionsInterface) => {
      return square.isEmpty;
    });

    if (emptySquares && emptySquares.length) {
      return emptySquares[0];
    }

    return null;

  }

  constructor() {
    super();
    this.squares = [];
    this.squareClick = new EventEmitter<[RowComponent, SquareOptionsInterface]>();
    this.leftClick = new EventEmitter<RowComponent>();
    this.rightClick = new EventEmitter<RowComponent>();
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options) {
      this.squares = this.transform(this.options);
    }
  }

  onSquareClick($event: SquareOptionsInterface): void {
    this.squareClick.emit([this, $event]);
  }

  onLeftClick(): void {
    this.shift(true);
    this.leftClick.emit(this);
  }

  onRightClick(): void {
    this.shift();
    this.rightClick.emit(this);
  }


  shift(left: boolean = false): void {
    if (this.squares && this.squares.length === 8) {
      if (left) {
        Utils.swap(this.squares[0], this.squares[1]);
        Utils.swap(this.squares[1], this.squares[2]);
        Utils.swap(this.squares[2], this.squares[3]);
        Utils.swap(this.squares[3], this.squares[4]);
        Utils.swap(this.squares[4], this.squares[5]);
        Utils.swap(this.squares[5], this.squares[6]);
        Utils.swap(this.squares[6], this.squares[7]);
      } else {
        Utils.swap(this.squares[7], this.squares[6]);
        Utils.swap(this.squares[6], this.squares[5]);
        Utils.swap(this.squares[5], this.squares[4]);
        Utils.swap(this.squares[4], this.squares[3]);
        Utils.swap(this.squares[3], this.squares[2]);
        Utils.swap(this.squares[2], this.squares[1]);
        Utils.swap(this.squares[1], this.squares[0]);
      }
      this.persist();
    }
  }

  get database(): DatabaseServiceInterface {
    let stateService: StateServiceInterface = this.options &&
    this.options.hasOwnProperty('stateService') ? this.options.stateService : null;
    return stateService ? stateService.databaseService : null;
  }

  persist(): void {
    this.squares.forEach((square: SquareOptionsInterface) => {
      this.persistSquareOptions(square);
    });
  }

  isSquarePersisted(id: string): boolean {
    let databaseService: DatabaseServiceInterface = this.database;
    if (databaseService) {
      return databaseService.exists(id);
    }
    return false;
  }

  restoreSquareOptions(id: string): SquareOptionsInterface {
    let databaseService: DatabaseServiceInterface = this.database,
      squareState: SquareOptionsInterface = null;
    if (databaseService) {
      squareState = databaseService.pull(id);
    }
    return squareState;
  }

  private transform(options: RowOptionsInterface): SquareOptionsInterface[] {
    let squares: SquareOptionsInterface[] = [];
    if (options.sequence && options.expectedSequence && options.sequence.length === options.expectedSequence.length) {
      options.sequence.map((num, i) => {
        let colClass: string = Utils.mapColClass(num),
          squareValue: number = i < (options.sequence.length - 1) ||
          (i < options.sequence.length && !options.isLast) ? num : null,
          squareIsEmpty: boolean = squareValue ? false : true,
          squareClass: string = squareValue ?  colClass : 'btn empty',
          squareExpectedValue: number = options.expectedSequence[i],
          squareId: string = 'row-' + options.index + '-square-' + squareExpectedValue,
          squareRow: number = options.index,
          squareCol: number = i + 1,
          squareOptions: SquareOptionsInterface = this.isSquarePersisted(squareId) ?
            this.restoreSquareOptions(squareId) :
            <SquareOptionsInterface>{
              id: squareId,
              isEmpty: squareIsEmpty,
              row: squareRow,
              col: squareCol,
              value: squareValue,
              expectedValue: squareExpectedValue,
              cssClass: squareClass
            };

        this.persistSquareOptions(squareOptions);

        squares.push(squareOptions);

        if (squareOptions.isEmpty) {
          options.emptySquare = squareOptions;
        }

      });
    }
    return squares;
  }

  private persistSquareOptions(options: SquareOptionsInterface): void {
    let databaseService: DatabaseServiceInterface = this.database;
    if (databaseService) {
      databaseService.push(options.id, options);
    }
  }
}
