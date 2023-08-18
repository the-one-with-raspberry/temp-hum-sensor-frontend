import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReadingsComponent } from './readings/readings.component';
import { ReadingsHistComponent } from './readings-hist/readings-hist.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadingsComponent,
    ReadingsHistComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
