import { Component, OnInit } from '@angular/core';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { faCode, faAngleRight, faAngleLeft, faSpinner, faTableColumns, faUserAstronaut, faNewspaper, faBox, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.scss']
})
export class PanelMenuComponent implements OnInit {
  faAngleLeft     : IconDefinition = faAngleLeft;
  faAngleRight    : IconDefinition = faAngleRight;
  faSpinner         : IconDefinition = faSpinner;
  faTableColumns  : IconDefinition = faTableColumns;
  faNewspaper     : IconDefinition = faNewspaper;
  faBox           : IconDefinition = faBox;
  faUserAstronaut : IconDefinition = faUserAstronaut;
  faCode          : IconDefinition = faCode;
  collapsed : boolean = true;
  limitForFloatMenu : number = 1050;
  constructor() { }

  ngOnInit(): void {
    let screenSize = document.body.offsetWidth;
    screenSize < this.limitForFloatMenu ? this.collapseMenu() : false;
  }

  collapseMenu() {
    this.collapsed = !this.collapsed
     if(this.collapsed){
       document.querySelector('#adminMenu')?.classList.remove('collapsed');
       document.querySelector('#app > .container')?.classList.remove('collapsed');
     } else {
       document.querySelector('#adminMenu')?.classList.add('collapsed');
       document.querySelector('#app > .container')?.classList.add('collapsed');
     }
   }

}
