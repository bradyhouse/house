import { Component, OnInit } from '@angular/core';
import { Hero } from '../shared/interfaces/hero';
import { HeroService } from '../shared/services/hero.service';
@Component({
  selector: 'sd-dashboard',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }
  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
