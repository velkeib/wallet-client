import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

  @Output() loading = new EventEmitter<boolean>();
  
  @Input() expenses: ExpenseTable[];
  page = 1;

  constructor(private homeService: HomeService, private router: Router) { }

  paginationArray: number[];


  ngOnInit(): void {

    this.loading.emit(true);

    this.homeService.getLastExpenses(this.router.url.split('/')[2], 1).pipe(first()).subscribe(
      data => {

        this.paginationArray = [1];

        console.log(new Date(data.content[0].dateOfCreation));
        this.expenses = data.content;

        if(data.totalPages == 2){

          this.paginationArray.push(2);
        }else if(data.totalPages >= 3){

          this.paginationArray.push(2);
          this.paginationArray.push(3);
        }

        this.loading.emit(false);
      }
    );
    
    this.loading.emit(false);

  }

  pagination(event: any) {

    this.page = Number(event.target.text);

    this.homeService.getLastExpenses(this.router.url.split('/')[2], this.page).pipe(first()).subscribe(
      data => {
        this.expenses = data.content;

        console.log(data.totalPages);

        this.paginationArray = [];
        
        if (this.page > 1) {
          this.paginationArray.push(this.page - 1);
          if(this.page == data.totalPages && data.totalPages > 2 ){
            this.paginationArray.push(this.page - 2);
          }
        }

        this.paginationArray.push(this.page);

        
        if (this.page < data.totalPages) {
          this.paginationArray.push(this.page + 1);
          if(this.page == 1 && data.totalPages > 2 ){
            this.paginationArray.push(this.page + 2);
          }
        }
        this.paginationArray.sort();

      }
    )




  }

}
