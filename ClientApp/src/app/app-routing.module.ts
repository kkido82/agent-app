import { DetailsFormComponent } from './components/details-form/details-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'form',
    component: DetailsFormComponent
  },
  {
    path: 'form/:id',
    component: DetailsFormComponent
  },
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
