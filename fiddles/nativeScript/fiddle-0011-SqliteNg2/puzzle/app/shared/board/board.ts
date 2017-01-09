
import { Square } from "./square";
import { Observable } from "rxjs/Rx";


export class Board {
    title: string;
    moves: number;
    level: number;
    nextScreen: string;
    squares: Square[];

}