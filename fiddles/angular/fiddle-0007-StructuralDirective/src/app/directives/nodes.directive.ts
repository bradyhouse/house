import {
  Directive,
  ChangeDetectorRef,
  DoCheck,
  DefaultIterableDiffer,
  Input,
  IterableDiffer,
  IterableDiffers,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  SimpleChanges,
  EmbeddedViewRef,
  IterableChangeRecord,
  TrackByFunction
} from '@angular/core';


export class Node {
  constructor(public $implicit: any, public index: number, public count: number) {
  }

  get first(): boolean {
    return this.index === 0;
  }

  get last(): boolean {
    return this.index === this.count - 1;
  }

  get even(): boolean {
    return this.index % 2 === 0;
  }

  get odd(): boolean {
    return !this.even;
  }
}

class NodeViewTuple {
  constructor(public node: any, public view: EmbeddedViewRef<Node>) {
  }
}


@Directive({
  selector: '[nodes][nodesOf]'
})
export class NodesDirective implements DoCheck, OnChanges {

  @Input() nodesOf: any;

  @Input() set nodesTrackBy(fn: TrackByFunction<any>) {
    if (fn != null && typeof fn !== 'function') {
      if (<any>console && <any>console.warn) {
        console.warn(
          `trackBy must be a function, but received ${JSON.stringify(fn)}`);
      }
    }
    this._trackByFn = fn;
  }

  get nodesTrackBy(): TrackByFunction<any> {
    return this._trackByFn;
  }

  private _differ: IterableDiffer<any> = null;
  private _trackByFn: TrackByFunction<any>;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: IterableDiffers,
              private _template: TemplateRef<Node>,
              private _viewContainer: ViewContainerRef) {
  }

  @Input()
  set nodesTemplate(value: TemplateRef<Node>) {
    if (value) {
      this._template = value;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('nodesOf' in changes) {
      const value = changes['nodesOf'].currentValue;
      if (!this._differ && value && typeof this._trackByFn == 'function') {
        try {
          this._differ = this._differs.find(value).create(this._changeDetector, this.nodesTrackBy);
        } catch (e) {
          throw new Error(
            `Cannot find a differ supporting object '${value}' ... nodes only supports binding to Iterables such as Arrays.`
          );
        }
      }
    }

  }

  ngDoCheck(): void {
    if (this._differ) {
      const changes: any = this._differ.diff(this.nodesOf);
      if (changes) this._applyChanges(changes);
    }
  }

  private _applyChanges(changes: DefaultIterableDiffer<any>) {
    const insertTuples: NodeViewTuple[] = [];
    changes.forEachOperation(
      (item: IterableChangeRecord<any>, adjustedPreviousIndex: number, currentIndex: number) => {
        if (item.previousIndex === null) {
          const view = this._viewContainer.createEmbeddedView(this._template, new Node(null, null, null), currentIndex);
          const tuple = new NodeViewTuple(item, <EmbeddedViewRef<Node>>view);
          insertTuples.push(tuple);
        } else if (currentIndex === null) {
          this._viewContainer.remove(adjustedPreviousIndex);
        } else {
          const view = this._viewContainer.get(adjustedPreviousIndex);
          this._viewContainer.move(view, currentIndex);
          const tuple = new NodeViewTuple(item, <EmbeddedViewRef<Node>>view);
          insertTuples.push(tuple);
        }
      }
    );

    insertTuples.forEach((tuple: NodeViewTuple) => {
      this._perViewChange(tuple.view, tuple.node);
    });

    for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
      const viewRef = <EmbeddedViewRef<Node>>this._viewContainer.get(i);
      viewRef.context.index = i;
      viewRef.context.count = ilen;
    }

    changes.forEachIdentityChange((record: any) => {
      const viewRef = <EmbeddedViewRef<Node>>this._viewContainer.get(record.currentIndex);
      viewRef.context.$implicit = record.item;
    });

  }

  private _perViewChange(view: EmbeddedViewRef<Node>, record: IterableChangeRecord<any>) {
    view.context.$implicit = record.item;
  }


}
