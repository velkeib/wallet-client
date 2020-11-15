import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwPaginationModule } from 'jw-angular-pagination';

import { HomeService } from './services/home.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { LoginComponent } from './login/login.component';
import { BasicAuthInterceptor } from './_helper/basic-auth.interceptor';
import { RegistrationComponent } from './registration/registration.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewmemberFormComponent } from './newmember-form/newmember-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ExpenseFormComponent,
    LoginComponent,
    RegistrationComponent,
    NavBarComponent,
    NewmemberFormComponent,
    ExpenseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
