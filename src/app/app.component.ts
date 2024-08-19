import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend_peku';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: any): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWith;
    console.log(data);

  }
}



