import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { provideState, provideStore } from "@ngrx/store";
import * as appEffects from "./store/effects/todo.effects";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { todoFeature } from "./store/reducers/todo.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(todoFeature),
    provideEffects(appEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync(),
]
};
