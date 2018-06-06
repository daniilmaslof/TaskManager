import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListTaskComponent} from "./Components/list-task/list-task.component";
const appRoutes: Routes = [
  {
    path: 'taskManager',
    component: ListTaskComponent
  },
  { path: '**', redirectTo: 'taskManager'}
  ];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
