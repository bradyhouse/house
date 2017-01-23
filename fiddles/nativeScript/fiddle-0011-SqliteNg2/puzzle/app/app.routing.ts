import {GameComponent} from './pages/game/game.component';
import {AboutComponent} from './pages/about/about.component';
import {LevelOneComponent} from './pages/level-one/level-one.component';
import {LevelTwoComponent} from './pages/level-two/level-two.component';
import {LevelThreeComponent} from './pages/level-three/level-three.component';
import {HighScoreComponent} from './pages/high-score/high-score.component';
import {AddHighScoreComponent} from './pages/high-score/add-high-score/add-high-score.component';

export const routes = [
  {path: '', component: GameComponent},
  {path: 'game/:target', component: GameComponent},
  {path: 'about', component: AboutComponent},
  {path: 'level-one', component: LevelOneComponent},
  {path: 'level-two', component: LevelTwoComponent},
  {path: 'level-three', component: LevelThreeComponent},
  {path: 'high-score', component: HighScoreComponent},
  {path: 'add-high-score/:level:moves:caller', component: AddHighScoreComponent}
];

export const navigatableComponents = [
  GameComponent,
  AboutComponent,
  LevelOneComponent,
  LevelTwoComponent,
  LevelThreeComponent,
  HighScoreComponent,
  AddHighScoreComponent
];
