import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './prueba/list/list.component';
//por cada uno hacer import y anadirlo en el route seguido con ,
const routes: Routes = [
  {path: 'index', component: ListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
