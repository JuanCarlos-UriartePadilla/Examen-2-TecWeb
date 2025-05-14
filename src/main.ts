/*import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppRoutingModule } from './app/app-routing.module';  // Asegúrate de importar las rutas
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [HttpClientModule],
});


bootstrapApplication(AppComponent, {
  providers: [
    AppRoutingModule,provideRouter(appRoutes)
  ], 
})
.catch(err => console.error(err));
*/

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppRoutingModule } from './app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule,  // Asegúrate de agregar HttpClientModule aquí
    AppRoutingModule,  // Asegúrate de agregar AppRoutingModule aquí
    provideRouter(appRoutes)
  ]
})
  .catch(err => console.error(err));