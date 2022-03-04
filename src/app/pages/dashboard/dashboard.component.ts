import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CovidService } from '../../services/covidService/covid.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title                   : string = 'Dashboard';
  data!                   : object ;
  date!                   : string;
  todayDeaths!            : number;
  critical!               : number;
  todayCases!             : number;
  todayRecovered!         : number;
  active!                 : number;
  activePerOneMillion!    : number;
  casesPerOneMillion!     : number;
  recoveredPerOneMillion! : number;
  isLoading               : boolean = true;
  @ViewChild('pieCanvas') private pieCanvas!: ElementRef;
  @ViewChild('barCanvas') private barCanvas!: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas!: ElementRef;

  pieChart: any;
  barChart: any;
  doughnut: any;

  constructor(private covidService : CovidService ) { }

  ngAfterViewInit(): void {}

  doughnutChart(){
    this.barChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          datasets: [{
              data: [{id: 'Sales', nested: {value: 1500}}, {id: 'Purchases', nested: {value: 500}}],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
              ],
              label: 'Red',
          }]
      },
      options: {
          parsing: {
              key: 'nested.value'
          }
      }
    })
  }

  barChartBrowser(): void {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
          labels: ['Casos de hoy', 'Recuperados de hoy',],
          datasets: [{
              label: 'Datos diarios',
              data: [this.todayCases, this.todayRecovered],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    })
  }

  pieChartBrowser(): void {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Activos', 'Casos', 'Recuperados'],
        datasets: [{
          backgroundColor: [
            '#e74c3c',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',

          ],
          data: [this.activePerOneMillion, this.casesPerOneMillion, this.recoveredPerOneMillion]
        }]
      }
    });
  }

  getCovidData(): void{
    this.covidService.getCovid().subscribe({
      next: data => {
        if(data) {
          this.isLoading = false;
          this.data                   = data
          this.date                   = data.updated;
          this.critical               = data.critical
          this.todayDeaths            = data.todayDeaths;
          this.todayCases             = data.todayCases;
          this.todayRecovered         = data.todayRecovered;
          this.active                 = data.active;
          this.activePerOneMillion    = data.activePerOneMillion;
          this.casesPerOneMillion     = data.casesPerOneMillion;
          this.recoveredPerOneMillion = data.recoveredPerOneMillion;
          /* Calling methods to create the chart after get the request data */
          this.pieChartBrowser();
          this.barChartBrowser()
          this.doughnutChart();
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.getCovidData();
  }

}
