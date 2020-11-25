import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { User } from '../model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartComponent } from '../chart/chart.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private homeService: HomeService, 
    private chartComponent: ChartComponent,
    private router: Router) { }

  expenseForm: FormGroup;


  expenses: Object[];


  name: string;
  users: User[];

  ngOnInit(): void {

    this.expenseForm = this.formBuilder.group({
      name: [null, Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      date: [''],
    });


    this.homeService.getUsers(this.router.url.split("/")[2]).subscribe(
      data => {
        this.users = data;
      }
    )
  }

  onSubmit() {
    console.log(this.expenseForm.value);

    this.homeService.setExpenses(this.expenseForm.value, this.router.url).subscribe(
      data => {
        this.expenses = data;

        this.homeService.getExpenses(this.router.url).subscribe(
          data => {
            this.chartComponent.expenses = data;
            this.chartComponent.updateChart();
          }
        );

        this.homeService.getLastExpenses(this.router.url.split('/')[2], 1).pipe(first()).subscribe(
          data => {
            this.chartComponent.expenseList = data.content;
          }
        );

      }
    );

  }

}
