import { GameComponent } from "./pages/game/game.component";
import { AboutComponent } from "./pages/about/about.component";
import { LevelOneComponent } from "./pages/level-one/level-one.component";

export const routes = [
    { path: "", component: GameComponent },
    { path: "about", component: AboutComponent },
    { path: "level-one", component: LevelOneComponent }
];

export const navigatableComponents = [
    GameComponent,
    AboutComponent,
    LevelOneComponent
];