import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPigFormComponent } from './add-pig-form/add-pig-form.component';
import { DisplayTableComponent } from './display-table/display-table.component';
import { PigMapComponent } from './pig-map/pig-map.component';

const routes: Routes = [
  { path: '', component: PigMapComponent, outlet: 'mapRouter'},
  { path: '', component: DisplayTableComponent, outlet: 'tableRouter'},
  { path: '', component: AddPigFormComponent, outlet: 'addPigRouter'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }