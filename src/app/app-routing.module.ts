import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadingsComponent } from './readings/readings.component';     // Add your component here
import { ReadingsHistComponent } from './readings-hist/readings-hist.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
    {
        path: 'readings/hist',
        component: ReadingsHistComponent
    },
    {
        path: 'readings/current',
        component: ReadingsComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }