import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HeroInterface }           from '../interfaces/hero.interface';
@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<HeroInterface[]> {
    return this.http
      .get(`app/heroes/?name=${term}`)
      .map(response => response.json().data as HeroInterface[]);
  }
}
