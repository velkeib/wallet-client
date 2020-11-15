import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'node_modules/chart.js';
import { HomeService } from '../services/home.service';
import { Expense } from '../model/expense';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { Dataset } from '../model/dataset';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  constructor(private homeService: HomeService, private router: Router) { }


  colors = [];
  sum = 0;
  myDoughnutChart;
  myChart;
  doughnutChartExpenses: Expense[];
  expenses: Expense[];
  monthNames = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
  loading = false;


  ngOnInit() {
    this.loading = true;

    this.homeService.getExpenses(this.router.url).subscribe(
      data => {
        this.expenses = data;
        this.loadChart();
        this.loading = false;
      }
    );

  }

  loadChart() {
 
    var datasets = [];
    var names = [];
    var doughnutData = [];
    var doughnutColor = [];

    for(var i = 0; i < this.expenses.length; i++){
      var dataset = new Dataset(this.expenses[i].name, i, this.expenses[i].data);
      dataset.setColor(i);
      names.push(this.expenses[i].name);
      doughnutData.push(this.expenses[i].data[5]);
      this.colors.push(dataset.getColor());
      datasets.push(dataset);
  }

    console.log(this.colors);

    this.myDoughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: names,
        datasets: [
          {
            backgroundColor: this.colors,
            data: doughnutData
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'bottom',
        },
        title: {
          display: false,
          text: 'Kiadások ebben a hónapban',

        }
      }
    });

    this.myChart = new Chart('expenseChart', {
      type: 'bar',
      data: {
        labels: this.getLastSixMonths(),
        datasets: datasets

      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'right'
        },
        scales: {
          yAxes: [{
            position: 'right',
            gridLines: {
              color: "#000000",
              drawBorder: false,
              display: true,
              lineWidth: 3,
              maxTicksLimit: 3,
            },
            ticks: {
              beginAtZero: true,
              fontColor: '#000000',
              fontSize: 14,
              padding: 10
            }
          }],
          xAxes: [{
            gridLines: {
              display: false,
              color: "#BDBDBD",
            },
            ticks: {
              beginAtZero: true,
              fontColor: '#000000',
              fontStyle: 'bold',
              fontSize: 14
            }
          }]
        }
      }
    });

    this.sumOfData();

  }

  updateChart() {
    for (var i = 0; i < this.myChart.config.data.datasets.length; i++) {
      this.myChart.config.data.datasets[i].data = this.expenses[i].data;
      this.myChart.config.data.datasets[i].label = this.expenses[i].name;
    }

    for (var i = 0; i < this.myDoughnutChart.config.data.datasets[0].data.length; i++) {
      this.myDoughnutChart.config.data.datasets[0].data[i] = this.expenses[i].data[5]
    }

    this.myDoughnutChart.update();
    this.myChart.update();
    this.sumOfData();
  }

  getCurrentMonth() {

    var d = new Date();
    return d.getMonth();
  }

  getLastSixMonths() {

    var months = [];

    for (var i = 0; i < 6; i++) {
      if (this.getCurrentMonth() - i < 0) {
        months.push(this.monthNames[12 + this.getCurrentMonth() - i]);
      } else {
        months.push(this.monthNames[this.getCurrentMonth() - i]);
      }
    }

    return months.reverse();

  }

  sumOfData() {

    this.doughnutChartExpenses = [];
    this.sum = 0;

    for (var i = 0; i < this.expenses.length; i++) {

      var sum = 0;

      for (var j = 0; j < this.expenses[i].data.length; j++) {
        sum = sum + this.expenses[i].data[j];
      }

      this.sum = this.sum + sum;

      this.doughnutChartExpenses.push(new Expense(this.expenses[i].name, sum));
    }

  }

}
