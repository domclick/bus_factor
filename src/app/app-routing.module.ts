import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusFactorListComponent } from './bus-factor-list/bus-factor-list.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  {path: 'skills/:id', component: SkillDetailComponent},
  {path: 'employees/:id', component: EmployeeDetailComponent},
  {path: 'bus_factors', component: BusFactorListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
