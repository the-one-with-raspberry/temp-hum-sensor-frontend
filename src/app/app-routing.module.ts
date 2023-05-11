import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadingsComponent } from './readings/readings.component';     // Add your component here
import { ReadingsHistComponent } from './readings-hist/readings-hist.component';
import { HomeComponent } from './home/home.component';

//This is my case 
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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }