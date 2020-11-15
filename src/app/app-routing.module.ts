import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component'; 
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './_helper/auth.guard';

const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'login'},
{ path: 'group/:groupId', component: ChartComponent, canActivate: [AuthGuard]  },
{ path: 'login', component: LoginComponent},
{ path: 'registration', component: RegistrationComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
