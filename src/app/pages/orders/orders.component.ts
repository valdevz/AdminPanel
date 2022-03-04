import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

interface modProduct  {
  category: string,
  description: string,
  image: string,
  price: number
  title: string,
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  constructor(private ordersService: OrdersService,
  private modalService: NgbModal) { }
  isLoading : boolean = true;
  closeModal!: string;
  title     : string = 'Órdenes'
  orders    : object = {};
  modalProd! : modProduct;
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.ordersService.getOrders().subscribe({
      next : data => {
        if(data){
          this.isLoading = false;
          this.orders = data;
        }
      },
      error : err => {
        console.log(err)
      }
    })
  }

  triggerModal(content:any, product:any) {
    this.modalProd = product;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
