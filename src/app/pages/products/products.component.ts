import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title : string = 'Productos'
  isLoading : boolean = true;
  products! : object;
  constructor(private ordersService : OrdersService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.ordersService.getOrders().subscribe({
      next : data => {
        if(data){
          this.isLoading = false;
          this.products = data;
          console.log(this.products)
        }
      },
      error : err => {
        console.log(err)
      }
    })
  }

}
