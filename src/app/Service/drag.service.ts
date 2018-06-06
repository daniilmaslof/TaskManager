import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
export interface DragSource {
  element: HTMLElement;
  index: number;
}

@Injectable()
export class DragService {

  dragSource$: BehaviorSubject<DragSource> = new BehaviorSubject(null);
  constructor() { }
}

