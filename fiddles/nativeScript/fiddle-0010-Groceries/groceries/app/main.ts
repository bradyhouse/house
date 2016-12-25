import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { setStatusBarColors } from "./utils/status-bar-util";
import { AppModule } from "./app.module";

setStatusBarColors();
platformNativeScriptDynamic().bootstrapModule(AppModule);
