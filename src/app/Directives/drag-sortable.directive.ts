import {
  Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output,
  Renderer2
} from '@angular/core';
import {DragService, DragSource} from '../Service/drag.service';
import 'rxjs/add/operator/pairwise';
import {take, takeUntil, takeWhile} from 'rxjs/operators';
import {element} from "protractor";
import {Subject} from "rxjs/Subject";

export interface DropSortableEvent {
  prewIndex: number;
  newIndex: number;
}

@Directive({
  selector: '[appDragSortable]'
})
export class DragSortableDirective {
  @Input() item;
  @Input() itemIndex: number;
  @Input() itemOpen: any;
  @Input() sortableElemetSelector: string;
  @Output() dropSortable: EventEmitter<DropSortableEvent> = new EventEmitter();

  @HostBinding('draggable')
  get draggable() {
    return true;
  }

  @HostBinding('class.dragging') dragging = false;

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    this.dragging = true;
    this.dragService.dragSource$.next({element: event.target, index: this.itemIndex});
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event) {
    this.dragService.dragSource$
      .pipe(
        takeWhile(dragSource => Boolean(dragSource)),
        take(1)
      )
      .subscribe((dragSource: DragSource) => {
        const dragEl = dragSource.element;
        const dragElIndex = dragSource.index;
        const textNodeType = 3;
        const target = event.target.nodeType === textNodeType ?
          event.target.closest(this.sortableElemetSelector) :
          event.target;
        const sortableEl = target.closest(this.sortableElemetSelector);
        if (dragEl !== sortableEl && dragEl.parentNode === sortableEl.parentNode) {
          if (isBefore(dragEl, sortableEl)) {
            this.render.insertBefore(sortableEl.parentNode, dragEl, sortableEl);
            this.dragService.dragSource$.next(Object.assign({}, dragSource, {
              index: dragElIndex - 1
            }));
          } else {
            this.render.insertBefore(sortableEl.parentNode, dragEl, sortableEl.nextSibling);
            this.dragService.dragSource$.next(Object.assign({}, dragSource, {
              index: dragElIndex + 1
            }));
          }
        }
      });

    event.preventDefault();

    function isBefore(firstNode, secondNode): boolean {
      if (firstNode.parentNode === secondNode.parentNode) {
        for (let cur = firstNode; cur; cur = cur.previousSibling) {
          if (cur === secondNode) {
            return true;
          }
        }
      }
      return false;
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event) {
    this.dragging = false;
    this.dragService.dragSource$.next(null);
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    this.dragService.dragSource$
      .pipe(
        takeWhile(dragSource => Boolean(dragSource)),
        take(1)
      )
      .subscribe((dragSource: DragSource) => {
        this.dropSortable.emit({prewIndex: this.itemIndex, newIndex: dragSource.index});
      });
  }

  constructor(private  dragService: DragService, private render: Renderer2) {
  }
}
