import { Component, OnInit } from '@angular/core';
import { HeroInterface } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
@Component({
  selector: 'dashboard',
  templateUrl: './app/shared/components/dashboard/dashboard.component.html',
  styleUrls: ['./app/shared/components/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: HeroInterface[] = [];
  constructor(private heroService: HeroService) { }
  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
