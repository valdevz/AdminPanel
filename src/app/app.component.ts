import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AdminPanel';
  mobileSize : boolean = false;
  limitForFloatMenu : number = 1050;

  ngOnInit(): void {
    this.isMobileSize()
  }
  isMobileSize(){
    let screenSize = document.body.offsetWidth;
    this.mobileSize = screenSize < this.limitForFloatMenu ? true : false;
  }

  onResize(event:any) {
    let screenSize = event.target.innerWidth;
    this.mobileSize = screenSize < this.limitForFloatMenu ? true : false;
  }
}
