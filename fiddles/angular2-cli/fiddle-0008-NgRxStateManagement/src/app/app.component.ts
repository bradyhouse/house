import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, provideStore } from '@ngrx/store';
import 'rxjs/Rx'
import {Observable} from 'rxjs/Observable';

import {id} from './id';
import {people} from './reducers/people';
import {partyFilter} from './reducers/party-filter';
import {partyModel, percentAttending} from './selectors';
import {
  ADD_PERSON,
  REMOVE_PERSON,
  ADD_GUEST,
  REMOVE_GUEST,
  TOGGLE_ATTENDING
} from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [provideStore({people, partyFilter})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public model;
  public percentAttendance: any;

  constructor(
    private _store: Store<any>
  ) {
    this.model = Observable.combineLatest(
      _store.select('people'),
    _store.select('partyFilter')
  )
    //extracting party model to selector
  .let(partyModel());
    //for demonstration on combining selectors
    this.percentAttendance = _store.let(percentAttending());
  }

  addPerson(name){
    this._store.dispatch({type: ADD_PERSON, payload: {id: id(), name}})
  }

  addGuest(id){
    this._store.dispatch({type: ADD_GUEST, payload: id});
  }

  removeGuest(id){
    this._store.dispatch({type: REMOVE_GUEST, payload: id});
  }

  removePerson(id){
    this._store.dispatch({type: REMOVE_PERSON, payload: id});
  }

  toggleAttending(id){
    this._store.dispatch({type: TOGGLE_ATTENDING, payload: id})
  }

  updateFilter(filter){
    this._store.dispatch({type: filter})
  }

}
