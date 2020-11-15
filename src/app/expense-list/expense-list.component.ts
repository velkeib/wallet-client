import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Expense } from '../model/expense';
import { ExpenseTable } from '../model/expense-table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  expenses: ExpenseTable[];

  constructor(private homeService: HomeService, private router: Router) { }



  ngOnInit(): void {

    this.homeService.getLastExpenses(1,1).pipe(first()).subscribe(
      data => {

        //console.log(this.datePipe.transform(data.content[0].dateOfCreation, 'yyyy-MM-dd'));

        console.log(new Date(data.content[0].dateOfCreation));
        this.expenses = data.content;
      }
    )

  }

}
