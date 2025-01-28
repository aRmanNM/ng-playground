import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SSRComponent } from './ssr/ssr.component';
import { ProtectedComponent } from './route-guard/protected.component';

@NgModule({
  declarations: [AppComponent, SSRComponent, ProtectedComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
