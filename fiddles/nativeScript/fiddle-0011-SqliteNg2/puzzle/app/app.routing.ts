import { GameComponent } from "./pages/game/game.component";
import { AboutComponent } from "./pages/about/about.component";

export const routes = [
    { path: "", component: GameComponent },
    { path: "about", component: AboutComponent }
];

export const navigatableComponents = [
    GameComponent,
    AboutComponent
];