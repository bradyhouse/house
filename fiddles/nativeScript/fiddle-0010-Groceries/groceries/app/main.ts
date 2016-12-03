// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { AppModule } from "./app.module";
import { NgModule } from "@angular/core";


platformNativeScriptDynamic().bootstrapModule(AppModule);