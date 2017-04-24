import { Component, OnInit } from '@angular/core';
import { HeroInterface } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
@Component({
  selector: 'sd-dashboard',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: HeroInterface[] = [];
  constructor(private heroService: HeroService) { }
  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
