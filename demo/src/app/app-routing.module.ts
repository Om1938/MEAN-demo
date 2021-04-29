import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';

const routes: Routes = [
  {
    path: '',
    component: ViewEmployeesComponent
  },
  {
    path: 'addEmployee',
    component: AddEmployeesComponent
  },
  {
    path: 'viewEmployee/:id',
    component: ViewEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
